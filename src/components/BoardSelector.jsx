// src/components/BoardSelector.jsx
import React, { useState } from "react";

export default function BoardSelector({ board, setBoard }) {
  const [error, setError] = useState(null);

  // Liste di vendorId per dispositivi di sviluppo comuni
  const USB_FILTERS = [
    { usbVendorId: 0x2341 }, // Arduino SA
    { usbVendorId: 0x2e8a }, // Raspberry Pi Foundation (es. Pico)
    { usbVendorId: 0x0483 }, // STMicroelectronics
    { usbVendorId: 0x1a86 }, // QinHeng (CH340)
    { usbVendorId: 0x0403 }, // Future Technology Devices Intl (FTDI)
  ];

  const defaultOptions = [
    { label: "Raspberry Pi 4", value: "raspberrypi4" },
    { label: "BeagleBone", value: "beaglebone" },
    { label: "STM32 Discovery", value: "stm32" },
  ];

  const detectSerial = async () => {
    setError(null);
    try {
      // Apre il dialog mostrando solo i dispositivi con vendorId in USB_FILTERS
      const port = await navigator.serial.requestPort({ filters: USB_FILTERS });
      const info = port.getInfo();
      await port.open({ baudRate: 9600 });
      await port.close();
      // Usa vendorId:productId come valore univoco se non è in defaultOptions
      const val = defaultOptions.find((o) => o.value === board)
        ? board
        : `${info.usbVendorId.toString(16)}:${info.usbProductId.toString(16)}`;
      setBoard(val);
    } catch (e) {
      if (e.name !== "AbortError") {
        setError("Errore serial: " + e.message);
      }
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Scheda hardware</h2>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <select
          value={board}
          onChange={(e) => setBoard(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          <option value="">Seleziona una scheda</option>
          {defaultOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          {board && !defaultOptions.some((o) => o.value === board) && (
            <option value={board}>{board}</option>
          )}
        </select>
        <button
          onClick={detectSerial}
          style={{
            padding: "0.6rem 1rem",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Rilevamento automatico
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
    </div>
  );
}
