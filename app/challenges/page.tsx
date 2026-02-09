"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Filter, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: '#FF006E' }} />
            <span 
              className="text-sm uppercase tracking-widest font-mono"
              style={{ color: '#8B8B9E' }}
            >
              Community Challenges
            </span>
            <Sparkles className="w-5 h-5" style={{ color: '#00F0FF' }} />
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00F0FF, #B829DD, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Challenge Board
          </h1>
          <p className="text-base sm:text-lg" style={{ color: '#6B6B7E' }}>
            Real problems from real people. Vote on what you&apos;d like to tackle, or share your own.
          </p>
        </motion.div>

        {/* Filters and Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 max-w-6xl mx-auto"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === null ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: filter === null ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                color: filter === null ? '#00F0FF' : '#8B8B9E',
              }}
            >
              <Filter className="w-4 h-4 inline mr-1" />
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag === filter ? null : tag)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all capitalize"
                style={{
                  background: filter === tag ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: filter === tag ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: filter === tag ? '#00F0FF' : '#8B8B9E',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
            <DialogTrigger asChild>
              <button
                className="px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #B829DD 50%, #FF006E 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0, 240, 255, 0.3)',
                }}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Share Challenge
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A0A0F] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">Share a Challenge</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">Title</label>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="What's the problem?"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">Description</label>
                  <Textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe the situation and what you've tried..."
                    rows={4}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">Tags (comma separated)</label>
                  <Input
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="workplace, technical, creative"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <Button 
                  onClick={handleSubmit} 
                  className="w-full"
                  style={{
                    background: 'linear-gradient(135deg, #00F0FF 0%, #B829DD 50%, #FF006E 100%)',
                  }}
                >
                  Submit Challenge
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Challenges Grid - 2 columns on tablet, 3 on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <ChallengeCard
                challenge={challenge}
                onVote={handleVote}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 mb-4">
              No challenges found with tag &quot;{filter}&quot;
            </p>
            <button
              onClick={() => setFilter(null)}
              className="px-6 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                color: '#00F0FF',
              }}
            >
              Show All Challenges
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
