"use client";

import { ReactNode } from 'react';

interface SplitContainerProps {
  humanSide: ReactNode;
  aiSide: ReactNode;
  fusion?: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function SplitContainer({
  humanSide,
  aiSide,
  fusion,
  className = '',
  orientation = 'horizontal',
}: SplitContainerProps) {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div className={`relative ${className}`}>
      {/* Main split container */}
      <div 
        className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} min-h-[600px] gap-px bg-[#1a1a25]`}
        style={{ 
          background: 'linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)',
        }}
      >
        {/* Human Side - Cyan accent */}
        <div 
          className={`relative ${isHorizontal ? 'flex-1' : 'flex-1'} p-8 overflow-hidden`}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.03) 0%, transparent 50%)',
          }}
        >
          {/* Side label */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                background: '#00F0FF',
                boxShadow: '0 0 10px #00F0FF, 0 0 20px rgba(0, 240, 255, 0.5)',
              }}
            />
            <span 
              className="text-xs uppercase tracking-widest font-mono"
              style={{ color: '#00F0FF' }}
            >
              Human Input
            </span>
          </div>
          
          {/* Corner accent */}
          <div 
            className="absolute top-0 left-0 w-32 h-32 opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, transparent 60%)',
            }}
          />
          
          {/* Content */}
          <div className="mt-12">
            {humanSide}
          </div>
        </div>
        
        {/* Divider / Fusion Zone */}
        <div 
          className={`relative ${isHorizontal ? 'w-px' : 'h-px'} flex-shrink-0`}
          style={{
            background: 'linear-gradient(180deg, #00F0FF 0%, #B829DD 50%, #FF006E 100%)',
          }}
        >
          {/* Fusion indicator */}
          {fusion && (
            <div 
              className={`absolute ${isHorizontal ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'} z-10`}
            >
              <div 
                className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest"
                style={{
                  background: 'rgba(184, 41, 221, 0.2)',
                  border: '1px solid #B829DD',
                  color: '#B829DD',
                  textShadow: '0 0 10px rgba(184, 41, 221, 0.5)',
                }}
              >
                Collaboration Zone
              </div>
            </div>
          )}
          
          {/* Animated pulse on divider */}
          <div 
            className={`absolute ${isHorizontal ? 'inset-y-0 left-1/2 -translate-x-1/2 w-4' : 'inset-x-0 top-1/2 -translate-y-1/2 h-4'}`}
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(184, 41, 221, 0.5) 50%, transparent 100%)',
              filter: 'blur(4px)',
            }}
          />
        </div>
        
        {/* AI Side - Magenta accent */}
        <div 
          className={`relative ${isHorizontal ? 'flex-1' : 'flex-1'} p-8 overflow-hidden`}
          style={{
            background: 'linear-gradient(225deg, rgba(255, 0, 110, 0.03) 0%, transparent 50%)',
          }}
        >
          {/* Side label */}
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <span 
              className="text-xs uppercase tracking-widest font-mono"
              style={{ color: '#FF006E' }}
            >
              AI Response
            </span>
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                background: '#FF006E',
                boxShadow: '0 0 10px #FF006E, 0 0 20px rgba(255, 0, 110, 0.5)',
              }}
            />
          </div>
          
          {/* Corner accent */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-20"
            style={{
              background: 'linear-gradient(225deg, rgba(255, 0, 110, 0.3) 0%, transparent 60%)',
            }}
          />
          
          {/* Content */}
          <div className="mt-12">
            {aiSide}
          </div>
        </div>
      </div>
      
      {/* Bottom fusion content if provided */}
      {fusion && (
        <div 
          className="p-8 mt-px"
          style={{
            background: 'linear-gradient(180deg, #12121A 0%, rgba(184, 41, 221, 0.05) 100%)',
            borderTop: '1px solid rgba(184, 41, 221, 0.2)',
          }}
        >
          {fusion}
        </div>
      )}
    </div>
  );
}
