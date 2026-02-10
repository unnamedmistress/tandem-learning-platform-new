"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Play, Clock } from "lucide-react";
import { Lesson, DepthLevel } from "../lib/types";
import { useUser } from "../lib/hooks/useUser";
import { getLessonTimer, formatTimerEstimate } from "../lib/data/lessonTimers";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  classId: string;
  index: number;
}

const depthColors: Record<DepthLevel, { bg: string; text: string; border: string }> = {
  surface: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  structure: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
  judgment: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
  fluency: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" },
};

export function LessonCard({ lesson, classId, index }: LessonCardProps) {
  const { user } = useUser();
  const isCompleted = user?.completedLessons.includes(lesson.id);
  const depth = user?.depthMarkers[lesson.id];
  const timer = getLessonTimer(lesson.id);

  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      isCompleted && "bg-muted/50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm text-muted-foreground">Lesson {index + 1}</span>
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimerEstimate(timer.minMinutes, timer.maxMinutes)}
              </Badge>
              {depth && (
                <Badge variant="outline" className={cn(
                  "text-xs capitalize",
                  depthColors[depth].bg,
                  depthColors[depth].text
                )}>
                  {depth}
                </Badge>
              )}
            </div>
            <h3 className={cn(
              "font-semibold mb-1",
              isCompleted && "text-muted-foreground"
            )}>
              {lesson.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {lesson.description}
            </p>
          </div>

          <Link href={`/lesson/${classId}/${lesson.id}`}>
            <Button size="sm" variant={isCompleted ? "outline" : "default"}>
              {isCompleted ? (
                "Review"
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </>
              )}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
