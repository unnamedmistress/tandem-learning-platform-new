"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MessageSquare, Lightbulb, Target, Zap } from "lucide-react";

interface CollaborationMasteryScoreProps {
  completedLessons: number;
  totalLessons: number;
  skillTokens: number;
  avgMessageLength: number;
  questionsAsked: number;
  reflectionsWritten: number;
}

interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  icon: typeof Target;
  description: string;
}

export function CollaborationMasteryScore({
  completedLessons,
  totalLessons,
  skillTokens,
  avgMessageLength,
  questionsAsked,
  reflectionsWritten,
}: CollaborationMasteryScoreProps) {
  // Calculate category scores
  const categories: ScoreCategory[] = [
    {
      name: "Completion",
      score: Math.min(completedLessons * 10, 100),
      maxScore: 100,
      icon: Target,
      description: "Lessons completed",
    },
    {
      name: "Engagement",
      score: Math.min(avgMessageLength * 2, 100),
      maxScore: 100,
      icon: MessageSquare,
      description: "Quality of participation",
    },
    {
      name: "Curiosity",
      score: Math.min(questionsAsked * 15, 100),
      maxScore: 100,
      icon: Lightbulb,
      description: "Questions asked",
    },
    {
      name: "Reflection",
      score: Math.min(reflectionsWritten * 20, 100),
      maxScore: 100,
      icon: Zap,
      description: "Reflections completed",
    },
  ];

  const totalScore = Math.round(
    categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length
  );

  const getScoreLevel = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: "Expert", color: "text-green-600 bg-green-100" };
    if (score >= 60) return { label: "Advanced", color: "text-blue-600 bg-blue-100" };
    if (score >= 40) return { label: "Intermediate", color: "text-amber-600 bg-amber-100" };
    return { label: "Beginner", color: "text-gray-600 bg-gray-100" };
  };

  const level = getScoreLevel(totalScore);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Collaboration Mastery Score</CardTitle>
          </div>
          <Badge className={level.color}>{level.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Score */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-5xl font-black text-primary">{totalScore}</div>
          <div className="text-sm text-muted-foreground mt-1">out of 100</div>
          <p className="text-sm text-muted-foreground mt-2">
            Your collaboration skills are improving! Keep practicing to level up.
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.score}%</span>
                </div>
                <Progress value={category.score} className="h-2" />
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
          <p className="font-medium mb-1">💡 How to improve:</p>
          <ul className="space-y-1 text-blue-700">
            <li>• Write more detailed responses (40+ characters)</li>
            <li>• Ask clarifying questions during AI conversations</li>
            <li>• Complete reflections thoughtfully</li>
            <li>• Try different AI personalities</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
