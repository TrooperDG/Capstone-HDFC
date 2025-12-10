import { v4 as uuidv4 } from "uuid";

// simple wait helper
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// mock signature generator (deterministic-ish)
function makeSignature(eventId) {
  // short mock signature for display
  return `sig_${eventId.slice(0, 8)}_${((Math.random() * 1e6) | 0)
    .toString(36)
    .toUpperCase()}`;
}

// routing table as requested (OTP/Payment/Security/Service)
const ROUTING = {
  OTP: ["SMS", "WHATSAPP", "INAPP"],
  Payment: ["INAPP", "SMS", "WHATSAPP"], // prefer in-app (push) then SMS
  Security: ["WHATSAPP", "SMS", "EMAIL", "INAPP"],
  Service: ["EMAIL", "INAPP"], // low priority -> email + inbox
};

function defaultForType(type) {
  return ROUTING[type] || ["SMS", "WHATSAPP", "EMAIL", "INAPP"];
}

export async function createEventAndStart({ type, message, state, dispatch }) {
  const id = uuidv4();

  function log(channel, msg, flags = {}) {
    dispatch({
      type: "ADD_LOG",
      log: {
        time: Date.now(),
        channel,
        message: msg,
        ...flags,
      },
    });
  }

  // construct base event (will be pushed to phone UI)
  const baseEvent = {
    id,
    type,
    message,
    sender: "HDFC Bank",
    createdAt: Date.now(),
    attempts: [],
    channel: null,
    status: "PENDING",
    verified: !state.spoofing,
    toast: null,
    signature: null, // will be set when delivered
  };

  dispatch({ type: "PUSH_EVENT", event: baseEvent });
  log("SYSTEM", `Event created: ${type} -> "${message.substring(0, 60)}"`);

  // choose channels for this event based on type
  const channels = defaultForType(type);

  for (let i = 0; i < channels.length; i++) {
    const channel = channels[i];

    // log attempt start
    log(channel, `Attempting delivery via ${channel}...`);

    // check device offline (if not INAPP) or channel blocked
    if (state.deviceOffline && channel !== "INAPP") {
      log(channel, `Device offline - cannot deliver via ${channel}`, {
        error: true,
      });
      // record failed attempt in event attempts
      dispatch({
        type: "UPDATE_EVENT",
        id,
        patch: {
          attempts: [
            ...(baseEvent.attempts || []),
            { channel, status: "FAILED", reason: "Device Offline" },
          ],
        },
      });
      await wait(600);
      continue;
    }

    if (state.blocked[channel]) {
      log(channel, `${channel} blocked`, { error: true });
      dispatch({
        type: "UPDATE_EVENT",
        id,
        patch: {
          attempts: [
            ...(baseEvent.attempts || []),
            { channel, status: "FAILED", reason: "Blocked" },
          ],
        },
      });
      await wait(600);
      continue;
    }

    // if not first channel, show retry countdown in logs + admin toast for visibility
    if (i > 0) {
      let countdown = 3;
      while (countdown > 0) {
        // log every second so admin log shows countdown
        log(channel, `Retrying ${channel} in ${countdown}s...`);
        dispatch({
          type: "SET_ADMIN_TOAST",
          toast: {
            message: `Retrying via ${channel} in ${countdown}s`,
            countdown,
            visible: true,
          },
        });
        await wait(1000);
        countdown--;
      }
      dispatch({ type: "SET_ADMIN_TOAST", toast: null });
    }

    // mark pending and simulate send delay
    dispatch({
      type: "UPDATE_EVENT",
      id,
      patch: { channel, status: "PENDING" },
    });
    await wait(1200);

    // here we decide delivered or not; for prototype we deliver unless blocked/offline
    const delivered = true;

    if (delivered) {
      const signature = makeSignature(id);
      dispatch({
        type: "UPDATE_EVENT",
        id,
        patch: {
          channel,
          status: "DELIVERED",
          verified: !state.spoofing,
          signature,
          toast: { visible: true, title: "Bank Alert", body: message },
        },
      });

      log(channel, `Delivered successfully via ${channel}`, { success: true });

      // admin success toast
      dispatch({
        type: "SET_ADMIN_TOAST",
        toast: { message: `Message delivered via ${channel}`, visible: true },
      });
      setTimeout(
        () => dispatch({ type: "SET_ADMIN_TOAST", toast: null }),
        2000
      );

      return;
    } else {
      log(channel, `${channel} failed`, { error: true });
      dispatch({
        type: "UPDATE_EVENT",
        id,
        patch: {
          attempts: [
            ...(baseEvent.attempts || []),
            { channel, status: "FAILED" },
          ],
        },
      });
    }

    // short backoff before trying next channel
    await wait(700);
  }

  // exhausted all, fallback to INAPP if available
  if (!state.blocked["INAPP"]) {
    const signature = makeSignature(id);
    dispatch({
      type: "UPDATE_EVENT",
      id,
      patch: {
        channel: "INAPP",
        status: "DELIVERED",
        verified: true,
        signature,
        toast: { visible: true, title: "In-App Alert", body: message },
      },
    });
    log("INAPP", "Delivered via In-App (fallback)", { success: true });
    dispatch({
      type: "SET_ADMIN_TOAST",
      toast: { message: "Delivered via In-App (fallback)", visible: true },
    });
    setTimeout(() => dispatch({ type: "SET_ADMIN_TOAST", toast: null }), 2000);
  } else {
    log("SYSTEM", "All channels failed", { error: true });
    dispatch({
      type: "SET_ADMIN_TOAST",
      toast: { message: "All channels failed", visible: true },
    });
    setTimeout(() => dispatch({ type: "SET_ADMIN_TOAST", toast: null }), 2000);
    dispatch({ type: "UPDATE_EVENT", id, patch: { status: "FAILED" } });
  }
}
