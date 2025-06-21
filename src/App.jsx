import React, { useState } from "react";
import { availableModules } from "./data/modules";
import ModuleSelector from "./components/ModuleSelector";
import BoardSelector from "./components/BoardSelector";
import ConfigPreview from "./components/ConfigPreview";
import ExportButton from "./components/ExportButton";
import Interpreter from "./components/Interpreter";
import "./index.css";

export default function App() {
  const [selectedModules, setSelectedModules] = useState([]);
  const [board, setBoard] = useState("");
  const [debug, setDebug] = useState(false);
  const [ota, setOta] = useState(false);

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

  return (
    <div className="card">
      <h1>Configuratore</h1>
      <BoardSelector board={board} setBoard={setBoard} />
      <ModuleSelector
        modules={availableModules}
        selected={selectedModules}
        setSelected={setSelectedModules}
      />
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <button
          className="toggle-btn"
          aria-pressed={debug}
          onClick={() => setDebug((d) => !d)}
        >
          Modalità Debug
        </button>
        <button
          className="toggle-btn"
          aria-pressed={ota}
          onClick={() => setOta((o) => !o)}
        >
          Supporto OTA
        </button>
      </div>

      <ConfigPreview config={config} />
      <ExportButton config={config} className="export" />
      <Interpreter config={config} />
    </div>
  );
}
