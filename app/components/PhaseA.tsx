"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Lesson } from "../lib/types";

interface PhaseAProps {
  lesson: Lesson;
  onComplete: (problem: string, context: string) => void;
}

export function PhaseA({ lesson, onComplete }: PhaseAProps) {
  const [problem, setProblem] = useState("");
  const [context, setContext] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = lesson.phases.a.contextQuestions;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleComplete = () => {
    onComplete(problem, context);
  };

  const allAnswered = problem.length > 10 && context.length > 20;

  return (
    <div className="space-y-6">
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 mt-0.5 text-primary" />
            <div>
              <p className="font-medium">{questions[currentQuestion]}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Describe your problem in your own words:
          </label>
          <Textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="What's the real challenge you're facing?"
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            What context should AI know about?
          </label>
          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Constraints, stakeholders, previous attempts..."
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between">
        {currentQuestion < questions.length - 1 ? (
          <Button onClick={handleNext} variant="outline">
            Next Question
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={handleComplete} disabled={!allAnswered}>
          Start First Attempt →
        </Button>
      </div>

      {!allAnswered && (
        <p className="text-sm text-muted-foreground text-right">
          Share a bit more to continue
        </p>
      )}
    </div>
  );
}
