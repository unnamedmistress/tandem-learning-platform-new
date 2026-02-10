"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  example: string;
}

const applyChallenges: ApplyChallenge[] = [
  {
    id: "apply-1",
    title: "Apply to Your Current Project",
    description: "Think of something you're working on right now. How would you apply what you learned in this lesson?",
    difficulty: "easy",
    example: "I'm building a website. Next time I ask AI for help, I'll explicitly say 'only the navigation bar, no other components' to avoid feature creep.",
  },
  {
    id: "apply-2",
    title: "Teach Someone Else",
    description: "Explain the key insight from this lesson to a friend or colleague. What example would you use?",
    difficulty: "medium",
    example: "I told my coworker about how AI kept adding features I didn't ask for, and how I learned to be more specific with my requests.",
  },
  {
    id: "apply-3",
    title: "Identify Your Pattern",
    description: "When in the past week have you faced a similar situation? What would you do differently now?",
    difficulty: "medium",
    example: "Yesterday I asked AI to write an email and just accepted the first draft. I should have asked it to adjust the tone for my specific audience.",
  },
  {
    id: "apply-4",
    title: "Create a Personal Rule",
    description: "Based on this lesson, create one rule you'll follow in future AI conversations.",
    difficulty: "easy",
    example: "My rule: Always specify constraints first before asking for solutions.",
  },
];

interface ApplyChallengeCardProps {
  className?: string;
}

export function ApplyChallengeCard({ className }: ApplyChallengeCardProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<ApplyChallenge | null>(null);
  const [response, setResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (response.length > 20) {
      setIsSubmitted(true);
      // Here you could save to localStorage or send to a backend
      localStorage.setItem(`apply_challenge_${selectedChallenge?.id}`, response);
    }
  };

  const getDifficultyColor = (difficulty: ApplyChallenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  if (isSubmitted) {
    return (
      <Card className={cn("bg-green-50 border-green-200", className)}>
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-900 mb-1">Challenge Complete!</h3>
          <p className="text-sm text-green-700 mb-4">
            Great job applying what you learned. That's how skills stick!
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsSubmitted(false);
              setSelectedChallenge(null);
              setResponse("");
            }}
            className="border-green-300 text-green-700"
          >
            Try Another Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (selectedChallenge) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Apply Challenge</CardTitle>
            </div>
            <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
              {selectedChallenge.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">{selectedChallenge.title}</h4>
            <p className="text-sm text-muted-foreground">{selectedChallenge.description}</p>
          </div>

          <div className="bg-muted rounded-lg p-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Example
            </p>
            <p className="text-sm text-muted-foreground italic">
              "{selectedChallenge.example}"
            </p>
          </div>

          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Share how you'll apply this lesson..."
            rows={4}
            className="resize-none"
          />

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChallenge(null)}
            >
              ← Back to Challenges
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={response.length < 20}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Apply to Your Own Project</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Choose a challenge to apply what you learned to your own work or life.
        </p>
        <div className="grid gap-2">
          {applyChallenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className="text-left p-3 rounded-lg border hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{challenge.title}</span>
                <Badge variant="outline" className={cn("text-xs", getDifficultyColor(challenge.difficulty))}>
                  {challenge.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {challenge.description}
              </p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
