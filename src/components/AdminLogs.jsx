import React, { useEffect, useRef, useState } from "react";
import { useSimulationState } from "../context/SimulationContext";

export default function AdminLogs() {
  const state = useSimulationState();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [state.logs.length]);

  return (
    <div className="mt-6 bg-black text-white rounded p-3">
      <div className="text-sm font-mono mb-2">Message Logs</div>

      <div
        ref={ref}
        style={{ maxHeight: 200 }}
        className="overflow-auto text-xs font-mono space-y-2"
      >
        {state.logs.map((l, i) => (
          <div key={i}>
            <span className="text-gray-500">
              {new Date(l.time).toLocaleTimeString()}
            </span>{" "}
            <span className="text-yellow-300">[{l.channel}]</span>{" "}
            <span
              className={
                l.success
                  ? "text-green-300"
                  : l.error
                  ? "text-red-300"
                  : "text-gray-300"
              }
            >
              {l.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
