import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNiTECH — Bringing You The Best of Taiwan",
  description: "Unitech Manufacturing Technologies Taiwan — Machinery, Manufacturing & OEM Products. 100% Made in Taiwan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
