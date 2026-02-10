"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, RotateCcw, AlertCircle } from "lucide-react";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { PracticeArc } from "../../../components/PracticeArc";
import { classes } from "../../../lib/data/classes";
import { useUser } from "../../../lib/hooks/useUser";
import { useLessonProgress } from "../../../lib/hooks/useLessonProgress";
import { getLessonTimer, formatTimerEstimate } from "../../../lib/data/lessonTimers";
import { DepthLevel, LessonProgress } from "../../../lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { completeLesson, addSkillToken } = useUser();
  const { getProgress, saveProgress, clearProgress, completeLesson: markLessonComplete } = useLessonProgress();
  
  const classId = params?.classId as string | undefined;
  const lessonId = params?.lessonId as string | undefined;
  
  const classData = classes.find((c) => c.id === classId);
  const lesson = classData?.lessons.find((l) => l.id === lessonId);
  const timer = lessonId ? getLessonTimer(lessonId) : null;
  const savedProgress = lessonId ? getProgress(lessonId) : null;
  
  const [showResumeAlert, setShowResumeAlert] = useState(false);

  useEffect(() => {
    if (savedProgress && savedProgress.currentPhase !== 'completed') {
      setShowResumeAlert(true);
    }
  }, [savedProgress]);

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
    markLessonComplete(lessonId, depth);
    
    // Add skill token based on lesson
    const skillTokens: Record<string, { name: string; description: string }> = {
      "mobile-1": { name: "Precision Intent", description: "You practiced being specific about what you want" },
      "mobile-2": { name: "Open to Surprise", description: "You recognized when AI found something unexpected" },
      "mobile-3": { name: "Healthy Skeptic", description: "You verified before trusting AI output" },
      "mobile-4": { name: "Clarity Guide", description: "You practiced writing for others" },
      "copilot-1": { name: "Spark Finder", description: "You use AI for ignition, not destination" },
      "copilot-2": { name: "Devil's Advocate", description: "You stress-tested your own reasoning" },
      "copilot-3": { name: "True Understanding", description: "You verified comprehension by teaching back" },
      "copilot-4": { name: "Ethical Navigator", description: "You developed awareness of AI boundaries" },
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

    // Clear progress after completion
    clearProgress(lessonId);
    
    // Navigate back to class page
    router.push(`/class/${classId}`);
  };

  const handleResume = () => {
    setShowResumeAlert(false);
  };

  const handleRestart = () => {
    if (lessonId) {
      clearProgress(lessonId);
      setShowResumeAlert(false);
      window.location.reload();
    }
  };

  const breadcrumbItems = [
    { label: classData.title, href: `/class/${classId}` },
    { label: lesson.title },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      {showResumeAlert && savedProgress && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Resume where you left off?</AlertTitle>
          <AlertDescription className="text-blue-700">
            You were in Phase {savedProgress.currentPhase.toUpperCase()} of this lesson.
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={handleResume} variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" /> Resume
              </Button>
              <Button size="sm" onClick={handleRestart} variant="ghost">
                Start Fresh
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            {timer && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimerEstimate(timer.minMinutes, timer.maxMinutes)}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{lesson.description}</p>
          {timer && (
            <p className="text-xs text-muted-foreground mt-2">
              Estimated time: {formatTimerEstimate(timer.minMinutes, timer.maxMinutes)} • {timer.reason}
            </p>
          )}
        </div>

        <PracticeArc 
          lesson={lesson} 
          onComplete={handleComplete}
          savedProgress={savedProgress}
          onSaveProgress={saveProgress}
        />
      </div>
    </div>
  );
}
