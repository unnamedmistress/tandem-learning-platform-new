"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UncertaintyEntry } from "../lib/types";
import { useUser } from "../lib/hooks/useUser";

interface UncertaintyLoggerProps {
  entries?: UncertaintyEntry[];
}

export function UncertaintyLogger({ entries: propEntries }: UncertaintyLoggerProps) {
  const { user, addUncertaintyEntry } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [newContext, setNewContext] = useState("");

  const entries = propEntries || user?.uncertaintyLog || [];

  const handleSubmit = () => {
    if (!newEntry.trim()) return;
    
    addUncertaintyEntry({
      id: Date.now().toString(),
      text: newEntry,
      timestamp: new Date().toISOString(),
    });
    
    setNewEntry("");
    setNewContext("");
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Uncertainty Log</CardTitle>
            <CardDescription>
              Private space to record moments of doubt
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Uncertainty</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    What felt uncertain?
                  </label>
                  <Textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="I wasn't sure if..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Context (optional)
                  </label>
                  <Input
                    value={newContext}
                    onChange={(e) => setNewContext(e.target.value)}
                    placeholder="Which lesson, what situation?"
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  Save Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No entries yet. Add your first moment of uncertainty.</p>
            <p className="text-sm mt-2">
              AI will surface patterns over time.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {entries.slice().reverse().map((entry) => (
                <Card key={entry.id} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="text-sm">{entry.text}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.timestamp).toLocaleDateString()}
                          {entry.phase && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                Phase {entry.phase.toUpperCase()}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
