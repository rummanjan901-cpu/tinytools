"use client";

import React, { useState } from "react";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import * as Icons from "lucide-react";

interface ToolItem {
  name: string;
  description: string;
  iconName: keyof typeof Icons;
  href: string;
  category: "Text" | "Graphics" | "Utilities";
}

const TOOLS_DATA: ToolItem[] = [
  {
    name: "Word Counter",
    description: "Analyze textual metrics such as words, spacing, paragraph instances, reading times real-time.",
    iconName: "FileText",
    href: "/word-counter",
    category: "Text",
  },
  {
    name: "Remove Duplicate Lines",
    description: "Strip clean repetitive structural duplicate strings from text records dynamically.",
    iconName: "Rows",
    href: "/remove-duplicate-lines",
    category: "Text",
  },
  {
    name: "Case Converter",
    description: "Map text mutations seamlessly among standard programmatic or standard prose formats.",
    iconName: "Type",
    href: "/case-converter",
    category: "Text",
  },
  {
    name: "Image Compressor",
    description: "Shrink image scale footprints natively in-browser securely with dynamic range previews.",
    iconName: "ImagePlus",
    href: "/image-compressor",
    category: "Graphics",
  },
  {
    name: "QR Code Generator",
    description: "Produce dynamic quick response clean graphic metrics completely locally without callbacks.",
    iconName: "QrCode",
    href: "/qr-generator",
    category: "Utilities",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Text", "Graphics", "Utilities"];

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                          tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 max-w-xl mx-auto pt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          Simple tools. <span className="text-neutral-400 dark:text-neutral-500 font-normal">No nonsense.</span>
        </h1>
        <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Fast, lightweight, security-first online structural operations operating entirely locally within your browser layer. No account setups, no server payloads.
        </p>
      </div>

      <div className="space-y-6">
        <SearchBar value={search} onChange={setSearch} />
        
        <div className="flex justify-center items-center gap-1.5 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategory === category
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <p className="text-sm text-neutral-400 dark:text-neutral-500">No tools found matching that keyword criteria.</p>
        </div>
      )}
    </div>
  );
}
