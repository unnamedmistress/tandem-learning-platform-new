"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Lightbulb, ChevronRight, ChevronLeft } from "lucide-react";
import { Lesson } from "../lib/types";
import { PhaseAHint, getRandomHints } from "../lib/data/hints";

interface PhaseAProps {
  lesson: Lesson;
  onComplete: (problem: string, context: string) => void;
}

export function PhaseA({ lesson, onComplete }: PhaseAProps) {
  const [problem, setProblem] = useState("");
  const [context, setContext] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [hints] = useState<PhaseAHint[]>(() => getRandomHints(4));

  const questions = lesson.phases.a.contextQuestions;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    onComplete(problem, context);
  };

  const nextHint = () => {
    setCurrentHintIndex((prev) => (prev + 1) % hints.length);
  };

  const prevHint = () => {
    setCurrentHintIndex((prev) => (prev - 1 + hints.length) % hints.length);
  };

  const allAnswered = problem.length > 10 && context.length > 20;
  const currentHint = hints[currentHintIndex];

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              idx <= currentQuestion ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 mt-0.5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">{questions[currentQuestion]}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hint Section */}
      <Card className="bg-amber-50/50 border-amber-200">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">
                Need help articulating?
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="text-amber-700 hover:text-amber-900"
            >
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
          </div>

          {showHints && (
            <div className="space-y-3">
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-sm text-amber-900 font-medium">
                  {currentHint.text}
                </p>
                {currentHint.example && (
                  <p className="text-xs text-amber-700 mt-2 italic">
                    Example: {currentHint.example}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevHint}
                  className="text-amber-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <span className="text-xs text-amber-600">
                  {currentHintIndex + 1} of {hints.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextHint}
                  className="text-amber-700"
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
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
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {problem.length} characters
          </p>
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
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {context.length} characters
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {currentQuestion > 0 && (
            <Button onClick={handlePrev} variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
          )}
          {currentQuestion < questions.length - 1 && (
            <Button onClick={handleNext} variant="outline" size="sm">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
        <Button onClick={handleComplete} disabled={!allAnswered}>
          Start First Attempt →
        </Button>
      </div>

      {!allAnswered && (
        <p className="text-sm text-muted-foreground text-right">
          Share a bit more to continue (problem: 10+ chars, context: 20+ chars)
        </p>
      )}
    </div>
  );
}
