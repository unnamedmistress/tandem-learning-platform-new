"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Target, User, Flame } from "lucide-react";
import { UserProvider } from "./lib/hooks/useUser";

const navItems = [
  { href: "/classes", label: "Classes", icon: GraduationCap },
  { href: "/challenges", label: "Challenges", icon: Target },
  { href: "/profile", label: "Profile", icon: User },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" className="dark">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <title>TANDEM - Master AI Workflows</title>
        <meta name="description" content="The Collaboration Dojo. Practice real problems. Build intuition. Become fluent in human-AI collaboration." />
      </head>
      <body className="bg-black text-white min-h-screen">
        <UserProvider>
          {/* Navigation */}
          <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-4 mt-4">
              <nav className="max-w-7xl mx-auto px-6 py-4 glass rounded-2xl">
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                      <span className="text-cyan-400">TAN</span>
                      <span className="text-pink-500">DEM</span>
                    </span>
                  </Link>

                  {/* Nav Links */}
                  <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                      const isActive = pathname ? (pathname === item.href || pathname.startsWith(`${item.href}/`)) : false;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
                            isActive
                              ? "text-white"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                          {isActive && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Menu Button */}
                  <button className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-5 h-0.5 bg-white mb-1.5" />
                    <div className="w-5 h-0.5 bg-white mb-1.5" />
                    <div className="w-5 h-0.5 bg-white" />
                  </button>
                </div>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-24">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
