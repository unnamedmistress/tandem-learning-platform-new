"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Users, User, Brain, Sparkles } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/classes", label: "Training", icon: GraduationCap },
    { href: "/challenges", label: "Challenges", icon: Users },
    { href: "/profile", label: "Artifacts", icon: Sparkles },
  ];
  
  const isActive = (href: string) => pathname?.startsWith(href) ?? false;
  
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))',
              border: '1px solid rgba(0, 240, 255, 0.3)',
            }}
          >
            <Brain 
              className="w-5 h-5 transition-colors"
              style={{ color: '#00F0FF' }}
            />
          </motion.div>
          <span 
            className="font-bold text-xl tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TANDEM
          </span>
        </Link>
        
        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                    transition-all duration-200
                  `}
                  style={{
                    color: active ? '#fff' : '#8B8B9E',
                    background: active 
                      ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))'
                      : 'transparent',
                    border: active 
                      ? '1px solid rgba(0, 240, 255, 0.3)'
                      : '1px solid transparent',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                  
                  {active && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{
                        boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
          
          {/* User Avatar */}
          <Link href="/profile">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))',
                border: '1px solid rgba(184, 41, 221, 0.3)',
              }}
            >
              <User className="w-5 h-5" style={{ color: '#B829DD' }} />
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
