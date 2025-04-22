"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Import category components
import CoreReactFeatures from "@/components/categories/core-react-features"
import HooksAndState from "@/components/categories/hooks-and-state"
import PerformanceOptimization from "@/components/categories/performance-optimization"
import UIPatterns from "@/components/categories/ui-patterns"
import AnimationAndTransitions from "@/components/categories/animation-and-transitions"
import FormHandling from "@/components/categories/form-handling"
import DataFetching from "@/components/categories/data-fetching"
import RoutingAndNavigation from "@/components/categories/routing-and-navigation"
import TestingAndDebugging from "@/components/categories/testing-and-debugging"
import Accessibility from "@/components/categories/accessibility"
import Security from "@/components/categories/security"
import DeploymentAndBuild from "@/components/categories/deployment-and-build"
import ReactEcosystem from "@/components/categories/react-ecosystem"
import AdvancedPatterns from "@/components/categories/advanced-patterns"

// Define categories
const categories = [
  { id: "core", name: "Core React Features", component: CoreReactFeatures },
  { id: "hooks", name: "Hooks & State Management", component: HooksAndState },
  { id: "performance", name: "Performance Optimization", component: PerformanceOptimization },
  { id: "ui", name: "UI Patterns & Components", component: UIPatterns },
  { id: "animation", name: "Animation & Transitions", component: AnimationAndTransitions },
  { id: "forms", name: "Form Handling", component: FormHandling },
  { id: "data", name: "Data Fetching & API", component: DataFetching },
  { id: "routing", name: "Routing & Navigation", component: RoutingAndNavigation },
  { id: "testing", name: "Testing & Debugging", component: TestingAndDebugging },
  { id: "a11y", name: "Accessibility", component: Accessibility },
  { id: "security", name: "Security", component: Security },
  { id: "deployment", name: "Deployment & Build", component: DeploymentAndBuild },
  { id: "ecosystem", name: "React Ecosystem", component: ReactEcosystem },
  { id: "patterns", name: "Advanced Patterns", component: AdvancedPatterns },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("core")

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">React Advanced Features Encyclopedia</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A comprehensive showcase of 100+ advanced React features, patterns, and techniques
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <Card className="h-[calc(100vh-220px)] md:sticky top-6">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Browse all feature categories</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="flex flex-col p-4 pt-0">
                {filteredCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    className="justify-start mb-1"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div>
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="w-full h-auto flex-wrap justify-start mb-4 overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <category.component />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </main>
  )
}
