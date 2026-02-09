"use client";

import { ClassCard } from "../components/ClassCard";
import { classes } from "../lib/data/classes";

export default function ClassesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Practice</h1>
        <p className="text-lg text-muted-foreground">
          Each class focuses on a different way of working with AI. 
          Pick what resonates with your current challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {classes.map((classData) => (
          <ClassCard key={classData.id} classData={classData} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Classes share the same structure but feel different. 
          The goal isn't completion—it's building your working relationship with AI.
        </p>
      </div>
    </div>
  );
}
