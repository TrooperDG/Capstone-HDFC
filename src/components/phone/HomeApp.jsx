import React from "react";

export default function HomeApp() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="text-lg font-semibold">Welcome</div>
      <div className="text-sm text-gray-500 mt-2">
        Open any app (SMS, WhatsApp, Email, Inbox)
      </div>
      <div className="text-xs text-gray-400 mt-4">
        Trusted Notifications Demo
      </div>
    </div>
  );
}
