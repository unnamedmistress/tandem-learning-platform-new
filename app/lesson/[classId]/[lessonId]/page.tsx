"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PracticeArc } from "../../../components/PracticeArc";
import { classes } from "../../../lib/data/classes";
import { useUser } from "../../../lib/hooks/useUser";
import { DepthLevel } from "../../../lib/types";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { completeLesson, addSkillToken } = useUser();
  
  const classId = params?.classId as string | undefined;
  const lessonId = params?.lessonId as string | undefined;
  
  const classData = classes.find((c) => c.id === classId);
  const lesson = classData?.lessons.find((l) => l.id === lessonId);

  if (!classData || !lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Lesson not found</p>
        <Link href="/classes">
          <Button>Back to Classes</Button>
        </Link>
      </div>
    );
  }

  const handleComplete = (depth: DepthLevel) => {
    if (!lessonId) return;
    completeLesson(lessonId, depth);
    
    // Add skill token based on lesson
    const skillTokens: Record<string, { name: string; description: string }> = {
      "mobile-1": { name: "Precision Intent", description: "You practiced being specific about what you want" },
      "mobile-2": { name: "Open to Surprise", description: "You recognized when AI found something unexpected" },
      "mobile-3": { name: "Healthy Skeptic", description: "You verified before trusting AI output" },
      "copilot-1": { name: "Spark Finder", description: "You use AI for ignition, not destination" },
      "business-1": { name: "Problem Reframer", description: "You questioned whether you're solving the right problem" },
      "prompt-1": { name: "Explicit Framer", description: "You made your tacit knowledge explicit" },
    };

    const token = skillTokens[lessonId];
    if (token) {
      addSkillToken({
        id: Date.now().toString(),
        name: token.name,
        description: token.description,
        earnedAt: new Date().toISOString(),
        context: classData.title,
        classId,
        lessonId,
      });
    }

    // Navigate back to class page
    router.push(`/class/${classId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/class/${classId}`}>
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {classData.title}
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>

        <PracticeArc lesson={lesson} onComplete={handleComplete} />
      </div>
    </div>
  );
}
