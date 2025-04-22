"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sun, Moon } from "lucide-react"

// Create a context with a default value
type ThemeContextType = {
  theme: "light" | "dark"
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Create a provider component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

// Custom hook to use the theme context
function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// A component that consumes the theme context
function ThemedButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Card className={theme === "dark" ? "bg-slate-800 text-white" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="theme-mode" checked={theme === "dark"} onCheckedChange={toggleTheme} />
            <Label htmlFor="theme-mode">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Label>
          </div>
          <span className="text-sm">Current theme: {theme}</span>
        </div>
        <div className="mt-4">
          <Button
            variant={theme === "dark" ? "outline" : "default"}
            className={theme === "dark" ? "border-white text-white hover:bg-slate-700" : ""}
          >
            Themed Button
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// A nested component that also consumes the theme
function ThemedCard() {
  const { theme } = useTheme()

  return (
    <Card className={theme === "dark" ? "bg-slate-800 text-white" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">Nested Themed Component</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This component is nested deeper in the tree but still has access to the theme context without prop drilling.
        </p>
      </CardContent>
    </Card>
  )
}

// The main component that demonstrates context
export default function ContextDemo() {
  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">About Context API:</h3>
        <p className="text-sm">
          Context provides a way to pass data through the component tree without having to pass props down manually at
          every level. This is especially useful for themes, user data, or preferences that many components need.
        </p>
      </div>

      <ThemeProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Theme Controls</h3>
            <ThemedButton />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Nested Component</h3>
            <ThemedCard />
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
