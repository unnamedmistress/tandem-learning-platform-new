"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Link2, BookOpen } from "lucide-react";
import { getRelatedLessons } from "../lib/data/relatedLessons";
import { classes } from "../lib/data/classes";

interface RelatedLessonsProps {
  currentLessonId: string;
  currentClassId: string;
}

export function RelatedLessons({ currentLessonId, currentClassId }: RelatedLessonsProps) {
  const related = getRelatedLessons(currentLessonId);

  if (related.length === 0) return null;

  // Get full lesson details
  const relatedLessonsDetails = related.map(relatedLesson => {
    const classData = classes.find(c => 
      c.lessons.some(l => l.id === relatedLesson.lessonId)
    );
    const lesson = classData?.lessons.find(l => l.id === relatedLesson.lessonId);
    return {
      ...relatedLesson,
      lesson,
      classData,
    };
  }).filter(item => item.lesson && item.classData);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Related Lessons</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {relatedLessonsDetails.map((item) => (
            <Link
              key={item.lessonId}
              href={`/lesson/${item.classData!.id}/${item.lessonId}`}
              className="group"
            >
              <div className="p-3 rounded-lg border hover:border-primary hover:bg-accent/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {item.lesson!.title}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.lesson!.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.classData!.title}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.skillConnection}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
