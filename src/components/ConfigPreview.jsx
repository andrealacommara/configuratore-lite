import React from "react";

export default function ConfigPreview({ config }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
        Anteprima Configurazione
      </h2>
      <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-x-auto">
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
}
