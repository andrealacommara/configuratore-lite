export default function ExportButton({ config }) {
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
    <div className="text-center mt-4">
      <button
        onClick={exportJSON}
        className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 px-5 rounded-md shadow transition"
      >
        Esporta Configurazione
      </button>
    </div>
  );
}
