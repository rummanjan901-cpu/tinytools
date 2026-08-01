"use client";

import React, { useState, useMemo } from "react";
import Button from "@/components/Button";
import { Copy, Trash2, Check } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Base 200 Words Per Minute metric

    return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Word Counter</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Perform real-time tracking of text metrics completely locally.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "Chars (No Space)", value: stats.charsNoSpaces },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Est. Read Time", value: `${stats.readingTime} min` },
        ].map((item, index) => (
          <div key={index} className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl p-4 text-center">
            <span className="block text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{item.label}</span>
            <span className="block text-xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <label htmlFor="counter-textarea" className="sr-only">Input text content block</label>
        <textarea
          id="counter-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text documents here to generate real-time metrics evaluation..."
          className="w-full h-80 p-4 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm resize-y"
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!text}>
            {copied ? <Check className="w-4 h-4 mr-1.5 text-green-500" /> : <Copy className="w-4 h-4 mr-1.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="danger" size="sm" onClick={() => setText("")} disabled={!text}>
            <Trash2 className="w-4 h-4 mr-1.5" /> Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
