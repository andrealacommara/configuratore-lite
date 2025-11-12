// === MAIN IMPORTS ===
import React, { useState } from "react";

// === LOOKUP TABLES ===
const boardMap = {
  "0x2341:0x0043": "arduino",
  "0x2e8a:0x0005": "raspberrypi-pico",
  "0x1a86:0x7523": "ch340",
  "0x0483:0x5740": "stm32",
};

const boardOptions = [
  { label: "Seleziona una scheda", value: "" },
  { label: "Raspberry Pi 4", value: "raspberrypi4" },
  { label: "BeagleBone", value: "beaglebone" },
  { label: "STM32 Discovery", value: "stm32" },
];

// === COMPONENT ===
export default function HardwareDetector({ board, setBoard }) {
  const [error, setError] = useState(null);

  // === USB PROBING ===
  const detectUSB = async () => {
    setError(null);
    try {
      const device = await navigator.usb.requestDevice({ filters: [] });
      const key = `0x${device.vendorId.toString(
        16
      )}:0x${device.productId.toString(16)}`;
      const detected = boardMap[key] || key;
      setBoard(detected);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Errore USB: " + err.message);
      }
    }
  };

  // === RENDER ===
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center gap-4 mb-2 flex-wrap sm:flex-nowrap">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-1"></h2>
          <select
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            {boardOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={detectUSB}
          className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 px-5 rounded-md shadow transition"
        >
          Rileva automaticamente
        </button>
      </div>
      {board && (
        <p className="text-sm text-gray-700">
          <span className="font-medium">Board selezionata:</span>{" "}
          <span className="font-mono">{board}</span>
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
