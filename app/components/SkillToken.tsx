"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock } from "lucide-react";
import { SkillToken as SkillTokenType } from "../lib/types";

interface SkillTokenProps {
  token: SkillTokenType;
}

export function SkillToken({ token }: SkillTokenProps) {
  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-amber-900">{token.name}</h4>
            <p className="text-sm text-amber-700/80 mt-1">{token.description}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-amber-600/60">
              <Clock className="w-3 h-3" />
              {new Date(token.earnedAt).toLocaleDateString()}
              {token.context && (
                <>
                  <span>•</span>
                  <span className="truncate">{token.context}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
