"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Tag } from "lucide-react";
import { Challenge } from "../lib/types";

interface ChallengeCardProps {
  challenge: Challenge;
  onVote?: (challengeId: string) => void;
}

export function ChallengeCard({ challenge, onVote }: ChallengeCardProps) {
  const [votes, setVotes] = useState(challenge.votes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setVotes(votes + 1);
      setHasVoted(true);
      onVote?.(challenge.id);
    }
  };

  const statusColors = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-blue-100 text-blue-800",
    solved: "bg-emerald-100 text-emerald-800",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{challenge.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {challenge.description}
            </CardDescription>
          </div>
          <Badge className={statusColors[challenge.status]}>
            {challenge.status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              by {challenge.submittedBy}
            </span>
            <span>{new Date(challenge.submittedAt).toLocaleDateString()}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVote}
            disabled={hasVoted}
            className={hasVoted ? "text-primary" : ""}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {votes}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
