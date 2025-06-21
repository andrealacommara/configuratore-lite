import React from "react";

export default function ModuleSelector({ modules, selected, setSelected }) {
  const toggle = (mod) =>
    setSelected((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        Moduli disponibili
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "0.5rem",
          overflowX: "auto",
          padding: "0.5rem 0",
        }}
      >
        {modules.map((mod) => {
          const isSel = selected.includes(mod);
          return (
            <button
              key={mod}
              onClick={() => toggle(mod)}
              style={{
                minWidth: "100px",
                padding: "0.6rem",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: isSel ? "#28a745" : "#ccc",
                backgroundColor: isSel ? "#d4edda" : "#fff",
                color: isSel ? "#155724" : "#333",
                cursor: "pointer",
                transition: "background .2s, border-color .2s",
                flexShrink: 0,
              }}
            >
              {mod}
            </button>
          );
        })}
      </div>
    </div>
  );
}
