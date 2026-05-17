import type { Metadata } from "next";
import { Inter, Anonymous_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-anonymous-pro",
});

export const metadata: Metadata = {
  title: "Polyglot Auditor — Architectural Security Intelligence",
  description: "Next-generation DevOps security auditing platform powered by Gemini 2.5 Flash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
