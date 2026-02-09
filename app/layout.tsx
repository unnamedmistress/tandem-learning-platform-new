import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./layout/Navigation";
import { PrivacyFooter } from "./layout/PrivacyFooter";
import { UserProvider } from "./lib/hooks/useUser";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: "TANDEM - The Collaboration Dojo",
  description: "Practice working with AI through real problems. Human creativity + AI intelligence = Fusion.",
};

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
      </head>
      <body 
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{
          background: '#0A0A0F',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <UserProvider>
          <Navigation />
          <main className="w-full">
            {children}
          </main>
          <PrivacyFooter />
        </UserProvider>
      </body>
    </html>
  );
}
