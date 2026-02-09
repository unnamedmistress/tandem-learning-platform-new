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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <UserProvider>
          <Navigation />
          <main className="pb-16 min-h-screen w-full flex flex-col items-center">
            <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
              {children}
            </div>
          </main>
          <PrivacyFooter />
        </UserProvider>
      </body>
    </html>
  );
}
