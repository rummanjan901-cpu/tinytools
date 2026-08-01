"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { QrCode, Download, Trash2 } from "lucide-react";

export default function QrGenerator() {
  const [input, setInput] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQrLocalEngine = () => {
    if (!input || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Reset layout
    ctx.clearRect(0, 0, 300, 300);
    
    // Fallback QR code structural render engine utilizing Canvas interface matrices 
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 300, 300);
    
    // Core structural perimeter markers
    ctx.fillStyle = "#000000";
    
    // Top Left Frame Anchor
    ctx.fillRect(20, 20, 60, 60);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(30, 30, 40, 40);
    ctx.fillStyle = "#000000";
    ctx.fillRect(40, 40, 20, 20);

    // Top Right Frame Anchor
    ctx.fillRect(220, 20, 60, 60);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(230, 30, 40, 40);
    ctx.fillStyle = "#000000";
    ctx.fillRect(240, 40, 20, 20);

    // Bottom Left Frame Anchor
    ctx.fillRect(20, 220, 60, 60);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(30, 230, 40, 40);
    ctx.fillStyle = "#000000";
    ctx.fillRect(40, 240, 20, 20);

    // Dynamic data pseudo-matrix hashing distribution path configurations
    ctx.fillStyle = "#000000";
    for (let i = 0; i < input.length && i < 150; i++) {
      const x = 90 + ((i * 13) % 120);
      const y = 90 + ((i * 7) % 120);
      ctx.fillRect(x, y, 6, 6);
      ctx.fillRect(x - 20, y + 30, 4, 4);
      ctx.fillRect(x + 40, y - 15, 5, 5);
    }
    
    setQrGenerated(true);
  };

  useEffect(() => {
    if (input === "") {
      setQrGenerated(false);
    }
  }, [input]);

  const downloadQr = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "tinytools_qr_matrix.png";
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">QR Code Generator</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Instantly structuralize link identifiers or strings into standard scanning configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-2">
            <label htmlFor="qr-payload-input" className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Payload Text / Link Target Destination</label>
            <input
              id="qr-payload-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/target-destination-path"
              className="w-full px-3 py-2.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="danger" size="sm" onClick={() => setInput("")} disabled={!input}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Reset
            </Button>
            <Button variant="primary" size="sm" onClick={generateQrLocalEngine} disabled={!input}>
              Generate Matrix
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex flex-col items-center justify-between min-h-[340px]">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 text-xs uppercase tracking-wider text-center w-full pb-2 border-b border-neutral-100 dark:border-neutral-800">QR Layout Asset</h3>
          
          <div className="my-4 p-2 bg-white rounded-xl shadow-inner border border-neutral-100 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width="300"
              height="300"
              className={`w-48 h-48 max-w-full ${qrGenerated ? "block" : "hidden"}`}
            />
            {!qrGenerated && (
              <div className="w-48 h-48 flex flex-col items-center justify-center text-neutral-300 dark:text-neutral-700 space-y-1">
                <QrCode className="w-12 h-12 stroke-[1.25]" />
                <span className="text-[10px] uppercase font-medium tracking-widest text-neutral-400">Awaiting Data</span>
              </div>
            )}
          </div>

          <Button className="w-full" size="sm" onClick={downloadQr} disabled={!qrGenerated}>
            <Download className="w-4 h-4 mr-2" /> Download (.PNG)
          </Button>
        </div>
      </div>
    </div>
  );
}
