"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Users, User, Brain, Sparkles, Menu, X } from "lucide-react";
import { Tooltip } from "../components/Tooltip";

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { 
      href: "/classes", 
      label: "Classes", 
      icon: GraduationCap,
      tooltip: "Browse AI practice classes by topic"
    },
    { 
      href: "/challenges", 
      label: "Challenges", 
      icon: Users,
      tooltip: "Community challenges and exercises"
    },
    { 
      href: "/profile", 
      label: "My Skills", 
      icon: Sparkles,
      tooltip: "Your earned skill tokens and progress"
    },
  ];
  
  const isActive = (href: string) => pathname?.startsWith(href) ?? false;
  
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 border-b bg-opacity-90 backdrop-blur-lg flex items-center justify-between bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white py-4 px-8"
      style={{
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="h-16 flex items-center justify-around w-full">
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
          <div className="flex flex-col">
            <span 
              className="font-bold text-xl tracking-wider hidden sm:block"
              style={{
                background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              TANDEM
            </span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 hidden sm:block">
              Free During Beta
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            
            return (
              <Tooltip key={item.href} content={item.tooltip} position="bottom">
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                      transition-all duration-200 cursor-pointer
                    `}
                    style={{
                      color: active ? '#fff' : '#8B8B9E',
                      background: active 
                        ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))'
                        : 'transparent',
                      border: active 
                        ? '1px solid rgba(0, 240, 255, 0.3)'
                        : '1px solid transparent',
                      minHeight: '44px',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    
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
              </Tooltip>
            );
          })}
          
          {/* User Avatar */}
          <Link href="/profile">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))',
                border: '1px solid rgba(184, 41, 221, 0.3)',
                minHeight: '44px',
                minWidth: '44px',
              }}
            >
              <User className="w-5 h-5" style={{ color: '#B829DD' }} />
            </motion.div>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/profile" className="md:hidden">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))',
                border: '1px solid rgba(184, 41, 221, 0.3)',
              }}
            >
              <User className="w-5 h-5" style={{ color: '#B829DD' }} />
            </motion.div>
          </Link>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-11 h-11 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              minHeight: '44px',
              minWidth: '44px',
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" style={{ color: '#FF006E' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: '#00F0FF' }} />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t"
            style={{
              background: 'rgba(10, 10, 15, 0.98)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-4 rounded-lg"
                      style={{
                        color: active ? '#fff' : '#8B8B9E',
                        background: active 
                          ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(255, 0, 110, 0.15))'
                          : 'rgba(255,255,255,0.02)',
                        border: active 
                          ? '1px solid rgba(0, 240, 255, 0.3)'
                          : '1px solid transparent',
                        minHeight: '56px',
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: active ? '#00F0FF' : '#8B8B9E' }} />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs" style={{ color: '#6B6B7E' }}>{item.tooltip}</div>
                      </div>
                      {active && (
                        <div className="ml-auto w-2 h-2 rounded-full" style={{ background: '#00F0FF' }} />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
