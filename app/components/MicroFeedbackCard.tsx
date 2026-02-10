"use client";

import { MicroFeedback } from "../lib/types";
import { getFeedbackIcon, getFeedbackColor } from "../lib/data/microFeedback";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MicroFeedbackCardProps {
  feedback: MicroFeedback;
  onDismiss: () => void;
}

export function MicroFeedbackCard({ feedback, onDismiss }: MicroFeedbackCardProps) {
  const colorClass = getFeedbackColor(feedback.type);
  const icon = getFeedbackIcon(feedback.type);

  return (
    <div className={`rounded-lg border p-4 ${colorClass} animate-in fade-in slide-in-from-top-2`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="font-medium">{feedback.message}</p>
          {feedback.actionItem && (
            <p className="text-sm mt-1 opacity-80">
              💡 {feedback.actionItem}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="shrink-0 -mt-1 -mr-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
