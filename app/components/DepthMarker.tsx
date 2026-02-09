"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DepthLevel } from "../lib/types";

interface DepthMarkerProps {
  level: DepthLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const depthConfig: Record<DepthLevel, { 
  label: string; 
  description: string;
  colors: { bg: string; text: string; border: string };
}> = {
  surface: {
    label: "Surface",
    description: "Used AI to generate something",
    colors: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-300",
    },
  },
  structure: {
    label: "Structure",
    description: "Shaped output through iteration",
    colors: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-300",
    },
  },
  judgment: {
    label: "Judgment",
    description: "Caught AI errors or limitations",
    colors: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-300",
    },
  },
  fluency: {
    label: "Fluency",
    description: "Adapted approach based on task",
    colors: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-300",
    },
  },
};

export function DepthMarker({ level, size = "md", showLabel = true }: DepthMarkerProps) {
  const config = depthConfig[level];
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium capitalize",
        config.colors.bg,
        config.colors.text,
        config.colors.border,
        sizeClasses[size]
      )}
      title={config.description}
    >
      {showLabel ? config.label : level.charAt(0).toUpperCase()}
    </Badge>
  );
}

export function DepthMarkerLegend() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">Progress Levels</p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(depthConfig) as DepthLevel[]).map((level) => (
          <div key={level} className="flex items-center gap-2">
            <DepthMarker level={level} size="sm" />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Depth markers track how you engage with AI, not completion percentage.
      </p>
    </div>
  );
}
