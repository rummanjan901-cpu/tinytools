"use client";

import React, { useState, useRef } from "react";
import Button from "@/components/Button";
import { Upload, Download, ShieldAlert, ImageIcon } from "lucide-react";

interface ImageStats {
  name: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  originalUrl: string;
  compressedUrl: string;
}

export default function ImageCompressor() {
  const [quality, setQuality] = useState(75);
  const [imageStats, setImageStats] = useState<ImageStats | null>(null);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const compressFile = (file: File, qualityValue: number) => {
    setCompressing(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert utilizing standard canvas export formats natively via local engine
        const targetType = file.type === "image/png" ? "image/jpeg" : file.type;
        const compressedDataUrl = canvas.toDataURL(targetType, qualityValue / 100);

        // Calculate theoretical file sizing boundaries matching base64 representations
        const head = compressedDataUrl.split(",")[0];
        const base64Str = compressedDataUrl.split(",")[1];
        const approxSize = Math.floor(atob(base64Str).length);

        setImageStats({
          name: file.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg",
          originalSize: file.size,
          compressedSize: approxSize,
          compressionRatio: Math.max(0, Math.round(((file.size - approxSize) / file.size) * 100)),
          originalUrl: img.src,
          compressedUrl: compressedDataUrl,
        });
        setCompressing(false);
      };
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      compressFile(e.target.files[0], quality);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      compressFile(e.dataTransfer.files[0], quality);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Image Compressor</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Reduce bitmap graphic files asset footprints completely inside your client runtime environment.</p>
      </div>

      <div className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl text-xs text-neutral-600 dark:text-neutral-400">
        <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0" />
        <span><strong>Privacy verification:</strong> Your files are managed locally via Web APIs. Binary payload structures never touch external servers or telemetry systems.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/30 rounded-2xl p-12 text-center cursor-pointer transition-colors space-y-3"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-xl flex items-center justify-center mx-auto">
              <Upload className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Drag & drop image file or browse local drive</p>
              <p className="text-xs text-neutral-400">Accepts standard web assets: JPG, PNG, WebP format payloads</p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <label htmlFor="quality-slider" className="text-neutral-700 dark:text-neutral-300">Target Quality Factor</label>
              <span className="text-neutral-900 dark:text-neutral-100">{quality}%</span>
            </div>
            <input
              id="quality-slider"
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-950 dark:accent-neutral-50"
            />
          </div>
        </div>

        <div>
          {imageStats ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 space-y-5">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 text-sm tracking-tight border-b border-neutral-100 dark:border-neutral-800 pb-2">Compression Evaluation</h3>
              
              <div className="space-y-3.5 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Original Size:</span>
                  <span className="text-neutral-800 dark:text-neutral-200">{formatSize(imageStats.originalSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Optimized Size:</span>
                  <span className="text-neutral-800 dark:text-neutral-200">{formatSize(imageStats.compressedSize)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Data Reduction:</span>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 font-bold">-{imageStats.compressionRatio}%</span>
                </div>
              </div>

              <div className="border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden aspect-video bg-neutral-50 dark:bg-neutral-950 relative flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageStats.compressedUrl} alt="Compressed payload representation matrix preview" className="object-contain max-h-full max-w-full" />
              </div>

              <a href={imageStats.compressedUrl} download={imageStats.name} className="block">
                <Button className="w-full" size="sm">
                  <Download className="w-4 h-4 mr-2" /> Download Image
                </Button>
              </a>
            </div>
          ) : (
            <div className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 text-center h-full flex flex-col justify-center items-center text-neutral-400 space-y-2 py-12">
              <ImageIcon className="w-8 h-8 text-neutral-300 dark:text-neutral-700" />
              <p className="text-xs">No pending operations queued currently.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
