import React from "react";

const ROUTING = {
  OTP: ["SMS", "WHATSAPP", "INAPP"],
  Payment: ["INAPP", "SMS", "WHATSAPP"],
  Security: ["WHATSAPP", "SMS", "EMAIL", "INAPP"],
  Service: ["EMAIL", "INAPP"],
};

export default function EventMapping({ selectedType }) {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Event → Channel Mapping</h3>

      {Object.entries(ROUTING).map(
        ([event, channels]) =>
          selectedType === event && (
            <div
              key={event}
              className={`p-2 mb-2 rounded ${
                selectedType === event
                  ? "bg-indigo-100 border border-indigo-400"
                  : "bg-white"
              }`}
            >
              <div className="font-medium">{event}</div>
              <div className="text-sm text-gray-600 mt-1">
                {channels.join(" → ")}
              </div>
            </div>
          )
      )}
    </div>
  );
}
