import React, { useState, useEffect } from "react";
import { availableModules } from "./data/modules";
import ModuleSelector from "./components/ModuleSelector";
import HardwareDetector from "./components/HardwareDetector";
import ConfigPreview from "./components/ConfigPreview";
import ExportButton from "./components/ExportButton";
import Interpreter from "./components/Interpreter";
import Login from "./components/Login";
import "./index.css";

export default function App() {
  const [selectedModules, setSelectedModules] = useState([]);
  const [board, setBoard] = useState("");
  const [debug, setDebug] = useState(false);
  const [ota, setOta] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const config = {
    board,
    modules: selectedModules,
    theme: "dark",
    resolution: "1280x720",
    language: "it",
    debug,
    ota,
    timestamp: new Date().toISOString(),
  };

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">
        Configuratore
      </h1>
      <HardwareDetector board={board} setBoard={setBoard} />
      <ModuleSelector
        modules={availableModules}
        selected={selectedModules}
        setSelected={setSelectedModules}
      />
      <div className="flex flex-wrap justify-center gap-4 my-6">
        <button
          onClick={() => setDebug((d) => !d)}
          aria-pressed={debug}
          className={`px-4 py-2 text-sm font-medium rounded-md border transition
      ${
        debug
          ? "bg-sky-600 text-white border-sky-700"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
      }`}
        >
          Modalità Debug
        </button>

        <button
          onClick={() => setOta((o) => !o)}
          aria-pressed={ota}
          className={`px-4 py-2 text-sm font-medium rounded-md border transition
      ${
        ota
          ? "bg-sky-600 text-white border-sky-700"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
      }`}
        >
          Supporto OTA
        </button>
      </div>

      <ConfigPreview config={config} />
      <ExportButton config={config} className="export" />
      <Interpreter config={config} token={token} />
    </div>
  );
}
