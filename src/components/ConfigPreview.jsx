import React from 'react'

export default function ConfigPreview({ config }) {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-2">Anteprima Configurazione</h2>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  )
}