import AdminPanel from "./components/AdminPanel";
import PhoneArea from "./components/PhoneArea";
import { SimulationProvider } from "./context/SimulationContext";

export default function App() {
  return (
    <SimulationProvider>
      <div className="min-h-screen ">
        <h1 className="text-2xl font-semibold  bg-slate-600 p-4 text-white">
          Trusted Notifications — Prototype
        </h1>
        <div className="grid grid-cols-12 ">
          <div className="col-span-5 border-r-4 border-gray-500">
            <AdminPanel />
          </div>
          <div className="col-span-7">
            <PhoneArea />
          </div>
        </div>
      </div>
    </SimulationProvider>
  );
}
