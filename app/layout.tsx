import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "./layout/Navigation";
import { UserProvider } from "./lib/hooks/useUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TANDEM - Practice AI Collaboration",
  description: "A practice-based platform for learning to work with AI. No lectures, no exams—just real problems and reflective practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
