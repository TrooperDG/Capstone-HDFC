import React from "react";
import ErrorPanel from "./ErrorPanel";
import PhoneMock from "./PhoneMock";

export default function PhoneArea() {
  return (
    <div className="py-6 bg-slate-300 px-6">
      <h2 className="text-xl font-semibold ">User Dashboard</h2>
      <div className="  text-gray-600 mb-6">
        <strong>Note:</strong> This is the USER side. You can simulate erros
        using <strong>Error Simulation Pannel</strong> below.
      </div>
      <div className="flex justify-around">
        <div className="mt-4">
          <PhoneMock />
        </div>
        <div className="mt-4">
          <ErrorPanel />
        </div>
      </div>
    </div>
  );
}
