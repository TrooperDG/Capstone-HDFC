import React from "react";

export default function AppShell({ children, onSelectApp, activeApp }) {
  const apps = [
    { id: "SMS", label: "Messages" },
    { id: "WHATSAPP", label: "WhatsApp" },
    { id: "EMAIL", label: "Email" },
    { id: "INAPP", label: "HDFC Inbox" },
  ];
  return (
    <div>
      <div className="bg-gray-900 text-white p-2 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xs">09:41</div>
        </div>
        <div className="text-xs">Battery 74%</div>
      </div>
      <div className="flex px-3 py-3 gap-4 border-b">
        {apps.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelectApp(a.id)}
            className={`flex-1 text-sm py-2 rounded hover:bg-indigo-100 ${
              activeApp === a.id ? "bg-indigo-100 underline" : "bg-indigo-50"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
