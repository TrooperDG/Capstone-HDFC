import { useState } from "react";
import AdminLogs from "./AdminLogs";
import EventMapping from "./EventMapping";

import {
  useSimulationDispatch,
  useSimulationState,
} from "../context/SimulationContext";
import { createEventAndStart } from "../utils/simulation";

const EVENT_TYPES = ["OTP", "Payment", "Security", "Service"];

export default function AdminPanel() {
  const state = useSimulationState();
  const dispatch = useSimulationDispatch();
  const [type, setType] = useState("OTP");
  const [message, setMessage] = useState("Your OTP is 834271");

  function send() {
    const ev = createEventAndStart({ type, message, state, dispatch });
    // createEventAndStart will push event and start simulation
  }

  return (
    <div className="bg-white px-8 py-6 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold ">Admin Dashboard</h2>
      <div className="  text-gray-600 mb-4">
        <strong>Note:</strong> This is the Admin side. Here you can simulate
        mesaage sending using the options below.
      </div>

      <label className="block text-sm font-medium">Event Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mt-1 block w-full p-2 border rounded"
      >
        {EVENT_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <EventMapping selectedType={type} />
      <label className="block text-sm font-medium mt-4">Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mt-1 block w-full p-2 border rounded"
        rows={3}
      ></textarea>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={send}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Send Notification
        </button>
        {/* <button
          onClick={() => {
            dispatch({
              type: "PUSH_EVENT",
              event: { id: "demo", type: "DEMO", createdAt: Date.now() },
            });
          }}
          className="px-3 py-2 border rounded"
        >
          Create Demo Event
        </button> */}
      </div>
      {/* {state.adminToast && (
        <div className="mt-4 p-3 rounded bg-yellow-50 border text-sm flex justify-between">
          <div>{state.adminToast.message}</div>
          <button
            onClick={() => dispatch({ type: "SET_ADMIN_TOAST", toast: null })}
            className="text-xs px-2 py-1 border rounded"
          >
            dismiss
          </button>
        </div>
      )} */}

      {/* <div className="mt-6">
        <ChannelOrderEditor />
      </div> */}

      <div className="mt-6">
        <AdminLogs />
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <strong>Note:</strong> This is a pure frontend simulation. Use the Error
        Panel to block channels and simulate spoofing.
      </div>
    </div>
  );
}
