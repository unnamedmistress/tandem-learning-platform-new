"use client";

import Link from "next/link";

export function PrivacyFooter() {
  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 py-3 px-4 z-40 border-t"
      style={{
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className=" flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-4">
          <span style={{ color: '#6B6B7E' }}>
            Your conversations are processed locally • No data stored permanently
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/privacy" 
            className="hover:text-white transition-colors"
            style={{ color: '#8B8B9E' }}
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            className="hover:text-white transition-colors"
            style={{ color: '#8B8B9E' }}
          >
            Terms
          </Link>
          <span style={{ color: '#6B6B7E' }}>
            Powered by OpenAI GPT-4
          </span>
        </div>
      </div>
    </footer>
  );
}
