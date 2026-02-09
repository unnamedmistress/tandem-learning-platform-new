"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Filter } from "lucide-react";
import { ChallengeCard } from "../components/ChallengeCard";
import { challenges as initialChallenges } from "../lib/data/challenges";
import { Challenge } from "../lib/types";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [filter, setFilter] = useState<string | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // New challenge form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTags, setNewTags] = useState("");

  const allTags = Array.from(
    new Set(challenges.flatMap((c) => c.tags))
  );

  const filteredChallenges = filter
    ? challenges.filter((c) => c.tags.includes(filter))
    : challenges;

  const handleVote = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId ? { ...c, votes: c.votes + 1 } : c
      )
    );
  };

  const handleSubmit = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newChallenge: Challenge = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      submittedBy: "anonymous",
      votes: 1,
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean) || ["workplace"],
      status: "open",
      submittedAt: new Date().toISOString(),
    };

    setChallenges([newChallenge, ...challenges]);
    setNewTitle("");
    setNewDescription("");
    setNewTags("");
    setIsSubmitOpen(false);
  };

  return (
    <div className=" py-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Challenge Board</h1>
        <p className="text-lg text-muted-foreground">
          Real problems from real people. Vote on what you'd like to tackle, or share your own.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
          >
            <Filter className="w-4 h-4 mr-1" />
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tag === filter ? null : tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Share Challenge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share a Challenge</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's the problem?"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the situation and what you've tried..."
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                <Input
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="workplace, technical, creative"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Submit Challenge
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onVote={handleVote}
          />
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No challenges found with this filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
