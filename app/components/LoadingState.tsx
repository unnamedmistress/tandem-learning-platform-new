"use client";

import { motion } from "framer-motion";

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = "Loading...", fullScreen = false }: LoadingStateProps) {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center" 
    : "flex items-center justify-center p-8";
  
  return (
    <div 
      className={containerClass}
      style={{ 
        background: fullScreen ? 'rgba(10, 10, 15, 0.98)' : 'transparent',
        backdropFilter: fullScreen ? 'blur(10px)' : 'none',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: '#00F0FF',
              borderRightColor: '#FF006E',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: '#B829DD',
              borderLeftColor: '#00F0FF',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        
        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm uppercase tracking-widest"
          style={{ color: '#8B8B9E' }}
        >
          {message}
        </motion.p>
        
        {/* Pulsing dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: '#00F0FF' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
