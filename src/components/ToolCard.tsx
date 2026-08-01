import Link from "next/link";
import React from "react";
import * as Icons from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  iconName: keyof typeof Icons;
  href: string;
}

export default function ToolCard({ name, description, iconName, href }: ToolCardProps) {
  const IconComponent = Icons[iconName] as React.ComponentType<{ className?: string }>;

  return (
    <div className="group relative border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 rounded-2xl p-6 transition-all hover:shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 mb-4 group-hover:scale-105 transition-transform text-neutral-800 dark:text-neutral-200">
          {IconComponent && <IconComponent className="w-5 h-5" />}
        </div>
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 text-base mb-1.5 tracking-tight">{name}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">{description}</p>
      </div>
      <Link 
        href={href} 
        className="inline-flex items-center justify-center w-full px-4 py-2 text-xs font-medium bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors text-neutral-800 dark:text-neutral-200"
      >
        Use Tool
      </Link>
    </div>
  );
}
