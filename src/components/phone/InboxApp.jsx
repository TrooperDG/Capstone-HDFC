import React from "react";
import {
  useSimulationState,
  useSimulationDispatch,
} from "../../context/SimulationContext";

export default function InboxApp() {
  const state = useSimulationState();
  const dispatch = useSimulationDispatch();
  const messages = state.events.filter((e) => e.channel === "INAPP");

  return (
    <div>
      <h3 className="font-semibold">HDFC Secure Inbox</h3>
      <div className="mt-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-gray-500">No messages</div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            onClick={() =>
              dispatch({ type: "SET_SELECTED_MESSAGE", message: m })
            }
            className="p-3 rounded bg-green-50 border hover:bg-green-100 cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium">HDFC Bank</div>
                <div className="text-sm text-gray-700">{m.message}</div>
              </div>
              <div className="text-xs text-gray-500">
                {m.status == "DELIVERED" && "RECEIVED"}
              </div>
            </div>

            <div className="text-xs mt-2 text-green-700">
              ✔ Signed & Verified
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
