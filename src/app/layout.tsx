import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "TinyTools - Simple Free Online Tools",
  description: "Fast, simple and free online tools for writing, images, text and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <Providers>
          <Header />
          <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
