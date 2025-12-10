import {
  useSimulationState,
  useSimulationDispatch,
} from "../context/SimulationContext";

export default function ErrorPanel() {
  const state = useSimulationState();
  const dispatch = useSimulationDispatch();

  return (
    <div className="bg-white p-4 rounded shadow  items-center gap-4 inline-block w-60">
      <div className="">
        <h3 className="font-semibold">Error Simulation Panel</h3>
        <p className="text-sm text-gray-500">
          Toggle a failure to simulate a channel issue.
        </p>
      </div>

      <div className="flex gap-2 flex-col mt-6">
        <button
          onClick={() => dispatch({ type: "TOGGLE_BLOCK", channel: "SMS" })}
          className={`px-3 py-2 rounded hover:bg-gray-200 duration-200 ${
            state.blocked.SMS ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
        >
          Block SMS
        </button>
        <button
          onClick={() =>
            dispatch({ type: "TOGGLE_BLOCK", channel: "WHATSAPP" })
          }
          className={`px-3 py-2 rounded hover:bg-gray-200 duration-200 ${
            state.blocked.WHATSAPP ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
        >
          Block WhatsApp
        </button>
        <button
          onClick={() => dispatch({ type: "TOGGLE_BLOCK", channel: "EMAIL" })}
          className={`px-3 py-2 rounded hover:bg-gray-200 duration-200 ${
            state.blocked.EMAIL ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
        >
          Block Email
        </button>
        <button
          onClick={() => dispatch({ type: "TOGGLE_BLOCK", channel: "INAPP" })}
          className={`px-3 py-2 rounded hover:bg-gray-200 duration-200 ${
            state.blocked.INAPP ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
        >
          Block Inbox
        </button>
        <button
          onClick={() =>
            dispatch({ type: "SET_SPOOF", value: !state.spoofing })
          }
          className={`px-3 py-2 rounded hover:bg-gray-200 duration-200 ${
            state.spoofing ? "bg-yellow-500 text-white" : "bg-gray-100"
          }`}
        >
          Toggle Spoof
        </button>
        <button
          onClick={() =>
            dispatch({ type: "SET_OFFLINE", value: !state.deviceOffline })
          }
          className={`px-3 py-2 rounded hover:bg-gray-200 duration-200 ${
            state.deviceOffline ? "bg-red-600 text-white" : "bg-gray-100"
          }`}
        >
          Device Offline
        </button>
      </div>
    </div>
  );
}
