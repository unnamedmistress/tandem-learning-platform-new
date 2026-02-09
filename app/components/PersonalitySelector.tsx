"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiPersonalities, AIPersonality } from "../lib/data/aiPersonalities";
import { Brain } from "lucide-react";

interface PersonalitySelectorProps {
  current: AIPersonality["id"];
  onChange: (personality: AIPersonality["id"]) => void;
}

export function PersonalitySelector({ current, onChange }: PersonalitySelectorProps) {
  const currentPersonality = aiPersonalities.find((p) => p.id === current);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Brain className="w-4 h-4" />
          <span className="hidden sm:inline">{currentPersonality?.name}</span>
          <Badge variant="secondary" className="ml-1">
            {currentPersonality?.avatar}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {aiPersonalities.map((personality) => (
          <DropdownMenuItem
            key={personality.id}
            onClick={() => onChange(personality.id)}
            className="flex items-start gap-3 py-3"
          >
            <span className="text-xl">{personality.avatar}</span>
            <div className="flex-1">
              <div className="font-medium">{personality.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {personality.description}
              </div>
            </div>
            {current === personality.id && (
              <Badge variant="default" className="ml-2">Active</Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
