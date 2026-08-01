"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import { Copy, Trash2 } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");

  const convertCase = (type: string) => {
    if (!text) return;
    let result = "";

    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.replace(/\b\w/g, (c) => c.toUpperCase());
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*|[.!?]\s+)(\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, (c) => c.toLowerCase());
        break;
      case "pascal":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[a-z]/, (c) => c.toUpperCase());
        break;
      case "snake":
        result = text
          .replace(/\s+/g, "_")
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .toLowerCase();
        break;
      case "kebab":
        result = text
          .replace(/\s+/g, "-")
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .toLowerCase();
        break;
      default:
        result = text;
    }
    setText(result);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Case Converter</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Map case structures among system and structural linguistic variants.</p>
      </div>

      <div className="space-y-3">
        <label htmlFor="case-input" className="sr-only">Text string content target input</label>
        <textarea
          id="case-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text strings to execute instant format conversions..."
          className="w-full h-64 p-4 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm resize-y"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { label: "UPPERCASE", type: "upper" },
            { label: "lowercase", type: "lower" },
            { label: "Title Case", type: "title" },
            { label: "Sentence case", type: "sentence" },
            { label: "camelCase", type: "camel" },
            { label: "PascalCase", type: "pascal" },
            { label: "snake_case", type: "snake" },
            { label: "kebab-case", type: "kebab" },
          ].map((btn) => (
            <button
              key={btn.type}
              onClick={() => convertCase(btn.type)}
              disabled={!text}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(text)} disabled={!text}>
            <Copy className="w-4 h-4 mr-1.5" /> Copy String
          </Button>
          <Button variant="danger" size="sm" onClick={() => setText("")} disabled={!text}>
            <Trash2 className="w-4 h-4 mr-1.5" /> Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
