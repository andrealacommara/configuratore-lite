import React, { useState } from "react";

export default function Interpreter({ config, token }) {
  const [errors, setErrors] = useState(null);

  const runInterpreter = async () => {
    setErrors(null);
    try {
      const res = await fetch("https://configuratore-lite.onrender.com/api/interpret", {
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

      // scarica direttamente lo zip
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "yocto-config.zip";
      a.click();
    } catch (err) {
      setErrors([{ message: err.message }]);
    }
  };

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
