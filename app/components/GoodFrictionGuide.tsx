"use client";

import { useState } from "react";
import { getFrictionExamplesForLesson, getRandomFrictionExamples } from "../lib/data/goodFriction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronDown, ChevronUp, X, Sparkles } from "lucide-react";

interface GoodFrictionGuideProps {
  lessonId?: string;
  onDismiss: () => void;
}

export function GoodFrictionGuide({ lessonId, onDismiss }: GoodFrictionGuideProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  
  const examples = lessonId 
    ? getFrictionExamplesForLesson(lessonId)
    : getRandomFrictionExamples(2);
  
  const currentExample = examples[currentExampleIndex];

  if (!currentExample) return null;

  return (
    <Card className="bg-amber-50/50 border-amber-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-base text-amber-900">Good Friction Guide</CardTitle>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
              Learn why friction helps
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-amber-700"
            >
              {isExpanded ? (
                <><ChevronUp className="w-4 h-4 mr-1" /> Less</>
              ) : (
                <><ChevronDown className="w-4 h-4 mr-1" /> More</>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-amber-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-amber-900">
              {currentExample.situation}
            </p>
            <p className="text-sm text-amber-800 mt-1">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              Friction: {currentExample.friction}
            </p>
          </div>
          
          {isExpanded && (
            <div className="bg-white/70 rounded-lg p-3 mt-3 animate-in fade-in">
              <p className="text-sm text-amber-900">
                <span className="font-medium">Why this helps:</span>{" "}
                {currentExample.whyItHelps}
              </p>
            </div>
          )}
          
          {examples.length > 1 && (
            <div className="flex items-center justify-between pt-2 border-t border-amber-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentExampleIndex((prev) => (prev - 1 + examples.length) % examples.length)}
                className="text-amber-700"
              >
                ← Previous
              </Button>
              <span className="text-xs text-amber-600">
                {currentExampleIndex + 1} of {examples.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentExampleIndex((prev) => (prev + 1) % examples.length)}
                className="text-amber-700"
              >
                Next →
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
