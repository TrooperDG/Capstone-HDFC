import React from "react";
import {
  useSimulationState,
  useSimulationDispatch,
} from "../../context/SimulationContext";

export default function EmailApp() {
  const state = useSimulationState();
  const dispatch = useSimulationDispatch();
  const messages = state.events.filter((e) => e.channel === "EMAIL");

  return (
    <div>
      <h3 className="font-semibold">Email</h3>
      <div className="mt-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-gray-500">No emails</div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            onClick={() =>
              dispatch({ type: "SET_SELECTED_MESSAGE", message: m })
            }
            className="p-3 rounded bg-gray-50 border hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium">Bank (Email)</div>
                <div className="text-sm text-gray-700">{m.message}</div>
              </div>
              <div className="text-xs text-gray-500">
                {m.status == "DELIVERED" && "RECEIVED"}
              </div>
            </div>

            <div className="text-xs mt-2">
              {m.status !== "DELIVERED" ? (
                <span className="text-gray-600">• Pending verification</span>
              ) : m.signature && m.verified ? (
                <span className="text-green-700">✔ Verified</span>
              ) : (
                <span className="text-red-600">⚠ Unverified</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
