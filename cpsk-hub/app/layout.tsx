import type { Metadata } from "next";
import Header from "./components/Header";
import { MobileFiltersProvider } from "./components/MobileFiltersContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "CPSK — Department Information & Communication Hub",
};

// This wraps EVERY page under app/ automatically — the "middle file"
// you were asking about. Add/remove things here and every page picks
// it up without editing each page.tsx individually.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900">
        <MobileFiltersProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </MobileFiltersProvider>
      </body>
    </html>
  );
}
