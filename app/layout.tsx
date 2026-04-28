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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}