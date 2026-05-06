import "./globals.css";
import Header from "./components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasiči Dukovany",
  description: "Web SDH a JPO Dukovany",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="flex min-h-screen flex-col bg-white">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <footer className="mt-20 border-t border-neutral-100 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-8 text-center text-xs text-neutral-400">
            <p>© {new Date().getFullYear()} Hasiči Dukovany</p>

            <a
              href="/admin/login"
              className="mt-1 inline-block transition hover:text-red-700"
            >
              Administrace
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}