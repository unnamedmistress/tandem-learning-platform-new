"use client";

import { SkillToken } from "../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillTokenDisplayProps {
  tokens: SkillToken[];
}

export function SkillTokenDisplay({ tokens }: SkillTokenDisplayProps) {
  if (tokens.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No Skill Tokens yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Complete lessons to earn tokens that track your collaboration skills
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-lg">Skill Tokens</CardTitle>
            </div>
            <Badge variant="secondary">{tokens.length} earned</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm text-blue-800">
            <Info className="w-4 h-4 inline mr-1" />
            Skill Tokens track your collaboration mastery. Each represents a specific skill 
            you've demonstrated while working with AI. Collect them all to build your 
            collaboration portfolio.
          </div>
          
          <div className="grid gap-3">
            {tokens.map((token) => (
              <div
                key={token.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-lg">
                  ✦
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{token.name}</h4>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{token.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Earned: {new Date(token.earnedAt).toLocaleDateString()}
                          </p>
                          {token.context && (
                            <p className="text-xs text-muted-foreground">
                              Context: {token.context}
                            </p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {token.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {token.context} • {new Date(token.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
