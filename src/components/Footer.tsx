import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 transition-colors text-xs text-neutral-500 dark:text-neutral-500">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-2 col-span-2">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">TinyTools</span>
          <p className="max-w-xs leading-relaxed">
            Simple tools. No nonsense. High performance utility interfaces operating completely client-side.
          </p>
          <p className="pt-2">© {currentYear} TinyTools. All rights reserved.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="font-medium text-neutral-800 dark:text-neutral-200 text-xs uppercase tracking-wider">Company</span>
          <Link href="/about" className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors">Contact Support</Link>
          <Link href="/pricing" className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors">Pricing Structure</Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="font-medium text-neutral-800 dark:text-neutral-200 text-xs uppercase tracking-wider">Legal</span>
          <Link href="/privacy" className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
