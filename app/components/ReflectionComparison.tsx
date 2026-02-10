"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Lightbulb, CheckCircle2, XCircle } from "lucide-react";

interface ReflectionComparisonProps {
  userReflection: string;
  lessonId: string;
}

interface BestPracticeExample {
  id: string;
  situation: string;
  weakReflection: string;
  strongReflection: string;
  keyDifferences: string[];
}

const bestPracticeExamples: BestPracticeExample[] = [
  {
    id: "bp-1",
    situation: "AI added features you didn't ask for",
    weakReflection: "I accepted the features. They seemed useful.",
    strongReflection: "I noticed AI added user authentication and analytics that I didn't specify. I accepted them without questioning because they seemed 'standard.' Next time, I'll explicitly state 'only these features, nothing else' to maintain focus on my core MVP.",
    keyDifferences: [
      "Specific about what AI added",
      "Acknowledges own behavior (accepted without questioning)",
      "Identifies a concrete next step",
      "Connects to broader goal (MVP focus)",
    ],
  },
  {
    id: "bp-2",
    situation: "AI suggested an unexpected direction",
    weakReflection: "AI surprised me. I went with it.",
    strongReflection: "AI suggested a mobile-first approach when I was thinking desktop. I felt conflicted because I had a clear plan, but AI's suggestion actually solved my responsive design problem better. I realized I was attached to my initial idea more than the outcome. Next time, I'll evaluate suggestions against the goal, not my ego.",
    keyDifferences: [
      "Describes the specific surprise",
      "Names the emotion (conflicted)",
      "Explains the evaluation process",
      "Identifies underlying pattern (ego attachment)",
    ],
  },
  {
    id: "bp-3",
    situation: "AI code worked initially but had edge case bugs",
    weakReflection: "The code broke later. I fixed it.",
    strongReflection: "AI's code handled standard inputs perfectly, but failed when I tested with empty strings and special characters. I should have specified edge cases upfront instead of assuming 'standard cases perfectly' meant all cases. I caught this by deliberately trying to break the code—next time I'll do this systematically before accepting any solution.",
    keyDifferences: [
      "Specific about what failed",
      "Acknowledges assumption that led to issue",
      "Describes verification method",
      "Commits to systematic approach next time",
    ],
  },
];

export function ReflectionComparison({ userReflection, lessonId }: ReflectionComparisonProps) {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const currentExample = bestPracticeExamples[currentExampleIndex];

  const nextExample = () => {
    setCurrentExampleIndex((prev) => (prev + 1) % bestPracticeExamples.length);
    setShowComparison(false);
  };

  const prevExample = () => {
    setCurrentExampleIndex((prev) => (prev - 1 + bestPracticeExamples.length) % bestPracticeExamples.length);
    setShowComparison(false);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-base text-blue-900">Reflection Comparison</CardTitle>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Learn from examples
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-blue-800">
          Compare your reflection with best practices. Strong reflections are specific, 
          self-aware, and include actionable next steps.
        </p>

        {/* User's Reflection */}
        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">Your Reflection</p>
          <p className="text-sm text-gray-700 line-clamp-4">
            {userReflection || "Complete your reflection to see comparison"}
          </p>
        </div>

        {/* Best Practice Example */}
        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
            Example: {currentExample.situation}
          </p>
          
          <div className="space-y-3">
            <div className="bg-red-50 rounded p-2 text-sm">
              <div className="flex items-center gap-1 text-red-600 mb-1">
                <XCircle className="w-3 h-3" />
                <span className="text-xs font-medium">Vague</span>
              </div>
              <p className="text-red-800">{currentExample.weakReflection}</p>
            </div>
            
            <div className="bg-green-50 rounded p-2 text-sm">
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-xs font-medium">Strong</span>
              </div>
              <p className="text-green-800">{currentExample.strongReflection}</p>
            </div>

            {showComparison && (
              <div className="bg-blue-50 rounded p-2 text-sm animate-in fade-in">
                <p className="font-medium text-blue-800 mb-1">What makes it strong:</p>
                <ul className="space-y-1">
                  {currentExample.keyDifferences.map((diff, idx) => (
                    <li key={idx} className="text-blue-700 text-xs flex items-start gap-1">
                      <span className="text-blue-400">•</span>
                      {diff}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevExample}
            className="text-blue-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className="text-blue-700 border-blue-300"
          >
            {showComparison ? "Hide Analysis" : "Show Analysis"}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextExample}
            className="text-blue-700"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
