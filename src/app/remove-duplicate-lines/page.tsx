"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import { Copy, Trash2, SlidersHorizontal } from "lucide-react";

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimLines, setTrimLines] = useState(true);

  const processText = () => {
    if (!input) return;
    const lines = input.split(/\r?\n/);
    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    lines.forEach((line) => {
      let matchKey = line;
      if (trimLines) matchKey = matchKey.trim();
      if (ignoreCase) matchKey = matchKey.toLowerCase();

      // Keep tracking structure but store original line layout format
      if (!seen.has(matchKey)) {
        seen.add(matchKey);
        uniqueLines.push(line);
      }
    });

    setOutput(uniqueLines.join("\n"));
  };

  const lineCount = (text: string) => text === "" ? 0 : text.split(/\r?\n/).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Remove Duplicate Lines</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Deduplicate list objects or raw string sequences instantly.</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-wrap gap-6 items-center text-sm font-medium">
        <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
          <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
          <span>Config:</span>
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="rounded border-neutral-300 dark:border-neutral-700 focus:ring-0 accent-neutral-900 dark:accent-neutral-100"
          />
          Ignore Case
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded border-neutral-300 dark:border-neutral-700 focus:ring-0 accent-neutral-900 dark:accent-neutral-100"
          />
          Trim Whitespace
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            <span>Input Content</span>
            <span>Lines: {lineCount(input)}</span>
          </div>
          <label htmlFor="dup-input" className="sr-only">Raw input data lines</label>
          <textarea
            id="dup-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your source lists or lines here..."
            className="w-full h-80 p-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm resize-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            <span>Unique Outputs</span>
            <span>Lines: {lineCount(output)}</span>
          </div>
          <label htmlFor="dup-output" className="sr-only">Processed deduplicated data output</label>
          <textarea
            id="dup-output"
            value={output}
            readOnly
            placeholder="Your deduplicated text will appear here..."
            className="w-full h-80 p-3 text-sm bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-neutral-100 shadow-sm resize-none focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="danger" size="sm" onClick={() => { setInput(""); setOutput(""); }} disabled={!input && !output}>
          <Trash2 className="w-4 h-4 mr-1.5" /> Clear All
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
            <Copy className="w-4 h-4 mr-1.5" /> Copy Output
          </Button>
          <Button variant="primary" size="sm" onClick={processText} disabled={!input}>
            Process Deduplication
          </Button>
        </div>
      </div>
    </div>
  );
}
