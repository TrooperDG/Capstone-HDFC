import React from "react";
import { useSimulationDispatch } from "../../context/SimulationContext";

export default function VerificationModal({ selected }) {
  const dispatch = useSimulationDispatch();

  if (!selected) return null;

  const {
    id,
    sender = "HDFC Bank",
    message,
    signature,
    verified,
    channel,
    createdAt,
  } = selected;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => dispatch({ type: "CLEAR_SELECTED_MESSAGE" })}
      ></div>

      <div className="relative w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-blue-800 text-white flex items-center gap-3">
          {/* simple shield */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline"
            >
              <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold">Message Verification</div>
            <div className="text-xs text-white/80">
              Trusted notification details
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div className="text-sm text-gray-700">
            <strong>From:</strong> {sender}{" "}
            <span className="ml-2 text-xs text-gray-400">({channel})</span>
          </div>
          <div className="text-sm text-gray-700">
            <strong>Received:</strong> {new Date(createdAt).toLocaleString()}
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-800 mb-2">{message}</div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">Signature</div>
              <div
                className={`text-xs font-mono ${
                  verified ? "text-green-700" : "text-red-600"
                }`}
              >
                {signature || "—"}
              </div>
            </div>

            <div className="mt-3">
              {verified ? (
                <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Verified — message signed by HDFC Bank
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  Unverified — treat with caution
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Explanation: Messages shown in the HDFC Secure Inbox are
            cryptographically signed. SMS/WhatsApp content may be a mirror —
            always verify via the inbox.
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-white flex justify-end gap-2">
          <button
            onClick={() => dispatch({ type: "CLEAR_SELECTED_MESSAGE" })}
            className="px-3 py-1 border rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
