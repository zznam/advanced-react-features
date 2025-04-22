"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Info } from "lucide-react"
import { useState } from "react"

interface FeatureCardProps {
  title: string
  description: string
  children: React.ReactNode
  code?: string
  docs?: string
  level?: "beginner" | "intermediate" | "advanced" | "expert"
  category?: string
}

export default function FeatureCard({
  title,
  description,
  children,
  code,
  docs,
  level = "intermediate",
  category,
}: FeatureCardProps) {
  const [view, setView] = useState<"demo" | "code">("demo")

  const levelColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    expert: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1.5">{description}</CardDescription>
          </div>
          <div className="flex gap-2">
            {category && (
              <Badge variant="outline" className="capitalize">
                {category}
              </Badge>
            )}
            <Badge className={levelColors[level]}>{level}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={(v) => setView(v as "demo" | "code")} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="demo">Demo</TabsTrigger>
              {code && <TabsTrigger value="code">Code</TabsTrigger>}
            </TabsList>
            {docs && (
              <Button variant="ghost" size="sm" asChild>
                <a href={docs} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  <span>Docs</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
          </div>

          <TabsContent value="demo" className="mt-0">
            <div className="p-4 border rounded-md bg-background">{children}</div>
          </TabsContent>

          {code && (
            <TabsContent value="code" className="mt-0">
              <div className="p-4 border rounded-md bg-muted overflow-auto max-h-[500px]">
                <pre className="text-sm">
                  <code>{code}</code>
                </pre>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
