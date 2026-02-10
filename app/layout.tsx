"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./lib/hooks/useUser";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <title>TANDEM - Master AI Workflows</title>
        <meta name="description" content="The Collaboration Dojo. Practice real problems. Build intuition. Become fluent in human-AI collaboration." />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
