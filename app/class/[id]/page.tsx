"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain } from "lucide-react";
import { LessonCard } from "../components/LessonCard";
import { classes } from "../lib/data/classes";
import { cn } from "@/lib/utils";

export default function ClassPage() {
  const params = useParams();
  const classId = params.id as string;
  const classData = classes.find((c) => c.id === classId);

  if (!classData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Class not found</p>
        <Link href="/classes">
          <Button>Back to Classes</Button>
        </Link>
      </div>
    );
  }

  const colorMap: Record<string, string> = {
    violet: "from-violet-500 to-purple-600",
    blue: "from-blue-500 to-cyan-600",
    slate: "from-slate-500 to-gray-600",
    amber: "from-amber-500 to-orange-600",
    emerald: "from-emerald-500 to-green-600",
    rose: "from-rose-500 to-pink-600",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/classes">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Classes
        </Button>
      </Link>

      <div className={cn("bg-gradient-to-r rounded-xl p-8 mb-8 text-white", colorMap[classData.colorScheme.primary])}>
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8" />
          <Badge variant="secondary" className="text-foreground">
            {classData.theme}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{classData.title}</h1>
        <p className="text-lg opacity-90 max-w-2xl">{classData.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Lessons</h2>
          {classData.lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              classId={classData.id}
              index={index}
            />
          ))}
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Mindset</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {classData.mindset}
              </p>
              
              <h3 className="font-semibold mb-2">The Problem</h3>
              <p className="text-sm text-muted-foreground">
                {classData.problemStatement}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
