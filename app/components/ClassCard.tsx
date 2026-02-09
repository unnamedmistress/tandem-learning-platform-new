"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen } from "lucide-react";
import { Class } from "../lib/types";
import { useUser } from "../lib/hooks/useUser";
import { cn } from "@/lib/utils";

interface ClassCardProps {
  classData: Class;
}

export function ClassCard({ classData }: ClassCardProps) {
  const { user } = useUser();
  
  const completedLessons = classData.lessons.filter((lesson) =>
    user?.completedLessons.includes(lesson.id)
  ).length;
  
  const progress = classData.lessons.length > 0
    ? (completedLessons / classData.lessons.length) * 100
    : 0;

  const colorMap: Record<string, { bg: string; border: string; badge: string; button: string }> = {
    violet: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      badge: "bg-violet-100 text-violet-800",
      button: "bg-violet-600 hover:bg-violet-700",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      badge: "bg-blue-100 text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    slate: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      badge: "bg-slate-100 text-slate-800",
      button: "bg-slate-600 hover:bg-slate-700",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-800",
      button: "bg-amber-600 hover:bg-amber-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      badge: "bg-emerald-100 text-emerald-800",
      button: "bg-emerald-600 hover:bg-emerald-700",
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      badge: "bg-rose-100 text-rose-800",
      button: "bg-rose-600 hover:bg-rose-700",
    },
  };

  const colors = colorMap[classData.colorScheme.primary] || colorMap.slate;

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", colors.bg, colors.border)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge className={colors.badge}>{classData.theme}</Badge>
          <BookOpen className="w-5 h-5 text-muted-foreground" />
        </div>
        <CardTitle className="text-xl mt-2">{classData.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {classData.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Problem:</span> {classData.problemStatement}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {completedLessons} of {classData.lessons.length} lessons
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Link href={`/class/${classData.id}`} className="block">
          <Button className={cn("w-full text-white", colors.button)}>
            {completedLessons === 0 ? "Start Class" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
