"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Award, AlertCircle, BarChart3 } from "lucide-react";
import { SkillToken } from "../components/SkillToken";
import { UncertaintyLogger } from "../components/UncertaintyLogger";
import { DepthMarkerLegend } from "../components/DepthMarker";
import { useUser } from "../lib/hooks/useUser";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
        <p>Loading profile...</p>
      </div>
    );
  }

  const completedCount = user.completedLessons.length;
  const totalLessons = 24; // 6 classes × 4 lessons
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Count depth markers
  const depthCounts = Object.values(user.depthMarkers).reduce((acc, depth) => {
    acc[depth] = (acc[depth] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Your Learning Profile</h1>
            <p className="text-muted-foreground">
              Member since {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{user.skillTokens.length}</div>
              <div className="text-sm text-muted-foreground">Skill Tokens</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{user.uncertaintyLog.length}</div>
              <div className="text-sm text-muted-foreground">Reflections</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{progressPercent}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tokens" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokens">
              <Award className="w-4 h-4 mr-2" />
              Skill Tokens
            </TabsTrigger>
            <TabsTrigger value="reflections">
              <AlertCircle className="w-4 h-4 mr-2" />
              Uncertainty Log
            </TabsTrigger>
            <TabsTrigger value="patterns">
              <BarChart3 className="w-4 h-4 mr-2" />
              Patterns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skill Tokens</CardTitle>
                <CardDescription>
                  Collectible observations about how you work with AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.skillTokens.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Complete lessons to earn skill tokens that reflect your working style.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.skillTokens.map((token) => (
                      <SkillToken key={token.id} token={token} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reflections">
            <UncertaintyLogger entries={user.uncertaintyLog} />
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interaction Patterns</CardTitle>
                <CardDescription>
                  How you tend to engage with AI based on your activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.interactionPatterns.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Complete some lessons to see patterns in how you work with AI.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {user.interactionPatterns.map((pattern) => (
                      <div
                        key={pattern.type}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium capitalize">
                            {pattern.type.replace(/_/g, " ")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {pattern.count} times
                          </p>
                        </div>
                        <Badge variant="outline">{pattern.count}</Badge>
                      </div>
                    ))}
                  </div>
                )}

                <DepthMarkerLegend />

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Depth Distribution</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["surface", "structure", "judgment", "fluency"].map((depth) => (
                      <div key={depth} className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{depthCounts[depth] || 0}</div>
                        <div className="text-xs text-muted-foreground capitalize">{depth}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
