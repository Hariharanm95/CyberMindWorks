// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { satoshi } from '@/lib/fonts';



export const metadata: Metadata = {
  title: "My App",
  description: "Inventory management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  className={satoshi.variable}>
      <body>{children}</body>
    </html>
  );
}
