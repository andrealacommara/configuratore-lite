// === MAIN IMPORTS ===
import React, { useState } from "react";
import BASE_API_URL from "../api";

// === COMPONENT ===
export default function Interpreter({ config, token }) {
  const [errors, setErrors] = useState(null);

  // === ACTIONS ===
  const runInterpreter = async () => {
    setErrors(null);
    try {
      const res = await fetch(`${BASE_API_URL}/interpret`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors || [{ message: "Errore sconosciuto" }]);
        return;
      }

      // Stream the ZIP download immediately
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "yocto-config.zip";
      a.click();
    } catch (err) {
      setErrors([{ message: err.message }]);
    }
  };

  // === RENDER ===
  return (
    <div className="text-center mt-4">
      <button
        onClick={runInterpreter}
        disabled={!config}
        className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 px-5 rounded-md shadow transition disabled:opacity-50"
      >
        Genera frammenti Yocto
      </button>
      {errors && (
        <div className="text-red-600 mt-3">
          <strong>Errori:</strong>
          <ul className="list-disc list-inside">
            {errors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
