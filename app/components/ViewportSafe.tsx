"use client";

interface ViewportSafeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Ensures content stays within viewport bounds and accounts for fixed headers
 */
export function ViewportSafe({ children, className = "" }: ViewportSafeProps) {
  return (
    <div className={`min-h-screen bg-black text-white w-full overflow-x-hidden ${className}`}>
      {/* Safety container prevents horizontal scroll */}
      <div className="w-full max-w-screen-xl mx-auto px-4 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
