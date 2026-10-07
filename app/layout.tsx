import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "First-Proof | Evidence task",
  description: "A bounded evidence task showing one observable decision behavior.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
