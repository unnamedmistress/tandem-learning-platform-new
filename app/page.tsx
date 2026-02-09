"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowRight, Sparkles, MessageCircle, BarChart3 } from "lucide-react";
import { AIChat } from "./components/AIChat";
import { useUser } from "./lib/hooks/useUser";

export default function Home() {
  const router = useRouter();
  const { user, recordInteraction } = useUser();
  const [step, setStep] = useState<"intro" | "problem" | "chat" | "reflection" | "complete">("intro");
  const [problem, setProblem] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [reflection, setReflection] = useState("");
  const [patternNoticed, setPatternNoticed] = useState<string | null>(null);

  const handleStart = () => {
    setStep("problem");
  };

  const handleSubmitProblem = () => {
    if (problem.length > 10) {
      setStep("chat");
      // Add initial AI message
      setChatMessages([
        {
          role: "assistant",
          content: `That sounds frustrating: "${problem.slice(0, 100)}${problem.length > 100 ? "..." : ""}"\n\nLet's work on this together. What's your first thought on how to approach it?`,
        },
      ]);
    }
  };

  const handleChatComplete = () => {
    setStep("reflection");
  };

  const handleComplete = () => {
    // Record the onboarding as an interaction
    recordInteraction(
      chatMessages.length > 3 ? "pushed_further" : "gave_up_early",
      "Onboarding session"
    );
    setStep("complete");
  };

  const patterns = [
    {
      id: "short",
      label: "Quick exchanges",
      description: "You kept messages brief. Sometimes that works, but more detail often helps AI understand context.",
    },
    {
      id: "questions",
      label: "Asking questions",
      description: "You asked clarifying questions. This is a great habit for avoiding misunderstandings.",
    },
    {
      id: "accepting",
      label: "Accepting responses",
      description: "You went with AI's suggestions. That's fine for exploration, but verification builds judgment.",
    },
  ];

  if (step === "intro") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">TANDEM</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Practice working with AI through real problems.
            <br />
            <span className="text-primary">No lectures. No exams. Just experience.</span>
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                This platform is different. You won't watch videos or take quizzes.
                You'll work on actual problems alongside an AI partner.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>6 practice classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span>AI personalities</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span>Pattern recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span>Skill tokens</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button size="lg" onClick={handleStart}>
            Start 15-Minute Intro
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (step === "problem") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto">
          <Badge className="mb-4">Step 1 of 5</Badge>
          <h2 className="text-3xl font-bold mb-4">What's annoying you at work right now?</h2>
          <p className="text-muted-foreground mb-8">
            Don't overthink it. Just describe something that's slightly frustrating—a task, 
            a decision, a communication issue. This is your real problem to work with.
          </p>

          <Textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="I need to... but..."
            rows={4}
            className="mb-4"
          />

          <Button 
            onClick={handleSubmitProblem} 
            disabled={problem.length < 10}
            className="w-full"
          >
            Let's work on this →
          </Button>

          {problem.length < 10 && problem.length > 0 && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Share a bit more detail to continue
            </p>
          )}
        </div>
      </div>
    );
  }

  if (step === "chat") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4">Step 2-3 of 5</Badge>
          <h2 className="text-2xl font-bold mb-2">Work with AI on your problem</h2>
          <p className="text-muted-foreground mb-6">
            Try to solve your problem. AI will respond—but notice when it helps, 
            when it's frustrating, when you feel stuck. That's the practice.
          </p>

          <div className="h-[500px] mb-6">
            <AIChat
              initialMessages={chatMessages.map((m, i) => ({
                id: i.toString(),
                role: m.role,
                content: m.content,
                timestamp: new Date().toISOString(),
              }))}
              onMessageSend={(content) => {
                setChatMessages([...chatMessages, { role: "user", content }]);
              }}
              onMessageReceive={(content) => {
                setChatMessages([...chatMessages, { role: "assistant", content }]);
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {chatMessages.filter(m => m.role === "user").length} messages exchanged
            </p>
            <Button onClick={handleChatComplete} variant="outline">
              I've hit some friction →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "reflection") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Badge className="mb-4">Step 4 of 5</Badge>
          <h2 className="text-3xl font-bold mb-4">The Mirror</h2>
          <p className="text-muted-foreground mb-8">
            Here's what we noticed about how you worked with AI. 
            Different people have different instincts—there's no "right" way.
          </p>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Select what resonates:</h3>
              <div className="space-y-3">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => setPatternNoticed(pattern.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      patternNoticed === pattern.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="font-medium mb-1">{pattern.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {pattern.description}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <label className="font-medium mb-2 block">
              What did you notice about your interaction?
            </label>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="I noticed that I..."
              rows={3}
            />
          </div>

          <Button 
            onClick={handleComplete} 
            disabled={!patternNoticed || reflection.length < 20}
            className="w-full"
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <Badge className="mb-4">Step 5 of 5</Badge>
          <h2 className="text-3xl font-bold mb-4">That was the platform.</h2>
          <p className="text-lg text-muted-foreground mb-8">
            You just experienced how TANDEM works: bring a problem, work with AI, 
            notice your patterns, try again with insight.
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">What you can do now:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <div>
                    <p className="font-medium">Explore 6 practice classes</p>
                    <p className="text-sm text-muted-foreground">
                      Each focuses on a different way of working with AI
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <div>
                    <p className="font-medium">Try different AI personalities</p>
                    <p className="text-sm text-muted-foreground">
                      The Skeptic, The Optimist, The Literalist, The Connector
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <div>
                    <p className="font-medium">Build your skill collection</p>
                    <p className="text-sm text-muted-foreground">
                      Earn tokens that reflect your emerging style
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link href="/classes">
            <Button size="lg">
              Explore Classes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
