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

        <footer className="text-center py-8 text-sm text-gray-400">
          <div>© 2026 Hasiči Dukovany</div>

          <a
            href="/admin"
            className="block mt-2 hover:text-red-700 transition-colors"
          >
            Administrace
          </a>
        </footer>
      </body>
    </html>
  );
}