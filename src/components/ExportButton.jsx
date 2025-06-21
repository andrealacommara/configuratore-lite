import React from "react";
export default function ExportButton({ config, className }) {
  const exportJSON = () => {
    if (!config.board) {
      alert("Seleziona prima una scheda.");
      return;
    }
    if (config.modules.length === 0) {
      alert("Seleziona almeno un modulo.");
      return;
    }
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "configurazione.json";
    link.click();
  };
  return (
    <button onClick={exportJSON} className={className}>
      Esporta Configurazione
    </button>
  );
}
