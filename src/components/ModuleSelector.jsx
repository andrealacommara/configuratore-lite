// === MAIN IMPORTS ===
import React from "react";

// === LABEL MAP ===
const moduleLabels = {
  bluetooth: "Bluetooth",
  display: "Display",
  navigation: "Navigazione",
  wifi: "Wi-Fi",
  touch: "Touchscreen",
};

// === COMPONENT ===
export default function ModuleSelector({ modules, selected, setSelected }) {
  // === STATE HELPERS ===
  const toggle = (mod) =>
    setSelected((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );

  // === RENDER ===
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-center mb-3 text-gray-800">
        Moduli disponibili
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {modules.map((mod) => {
          const isSel = selected.includes(mod);
          const label =
            moduleLabels[mod] || mod.charAt(0).toUpperCase() + mod.slice(1);
          return (
            <button
              key={mod}
              onClick={() => toggle(mod)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition
                ${
                  isSel
                    ? "bg-green-100 text-green-800 border-green-400"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
