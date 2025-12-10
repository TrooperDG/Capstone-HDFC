import React, { useEffect } from "react";
import {
  useSimulationState,
  useSimulationDispatch,
} from "../../context/SimulationContext";

export default function Toasts() {
  const state = useSimulationState();
  const dispatch = useSimulationDispatch();

  const last = state.events[0];
  if (!last || !last.toast || !last.toast.visible) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: "UPDATE_EVENT",
        id: last.id,
        patch: { toast: { ...last.toast, visible: false } },
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [last]);

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-72 bg-white border p-3 rounded shadow z-50">
      <div className="font-medium">{last.toast.title}</div>
      <div className="text-sm text-gray-600">{last.toast.body}</div>
    </div>
  );
}
