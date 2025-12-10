import React, { useState } from "react";
import AppShell from "./phone/AppShell";
import HomeApp from "./phone/HomeApp";
import SMSApp from "./phone/SMSApp";
import WhatsAppApp from "./phone/WhatsAppApp";
import EmailApp from "./phone/EmailApp";
import InboxApp from "./phone/InboxApp";
import Toasts from "./phone/Toasts";
import VerificationModal from "./phone/VerificationModal";
import { useSimulationState } from "../context/SimulationContext";

export default function PhoneMock() {
  const [activeApp, setActiveApp] = useState("HOME");
  const state = useSimulationState();

  return (
    <div
      className="mx-auto bg-white phone-frame relative flex flex-col items-center pb-4"
      style={{ width: 380 }}
    >
      {/* Screen */}
      <div
        className="w-full bg-white rounded-xl overflow-hidden"
        style={{ height: 680, border: "1px solid #ddd" }}
      >
        <AppShell onSelectApp={setActiveApp} activeApp={activeApp}>
          <div className="relative p-4 h-full overflow-hidden">
            <Toasts />
            <div className="mt-4">
              {activeApp === "HOME" && <HomeApp />}
              {activeApp === "SMS" && <SMSApp />}
              {activeApp === "WHATSAPP" && <WhatsAppApp />}
              {activeApp === "EMAIL" && <EmailApp />}
              {activeApp === "INAPP" && <InboxApp />}
            </div>
          </div>
        </AppShell>
      </div>

      {/* Home button */}
      <button
        onClick={() => setActiveApp("HOME")}
        className="mt-4 rounded-md bg-gray-100 active:bg-gray-300 shadow-inner border hover:bg-gray-400 duration-100 px-2 py-1"
      >
        Home
      </button>

      {/* Verification modal (renders when selectedMessage is set in context) */}
      <VerificationModal selected={state.selectedMessage} />
    </div>
  );
}
