import React, { useState } from "react";

export default function Interpreter({ config }) {
  const [errors, setErrors] = useState(null);

  const runInterpreter = async () => {
    setErrors(null);
    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors);
        return;
      }
      // scarica ciascun file restituito
      Object.entries(data).forEach(([name, content]) => {
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
      });
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
