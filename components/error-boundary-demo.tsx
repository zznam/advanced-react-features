"use client"

import type React from "react"

import { Component, type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

// Error Boundary class component
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback
    }

    return this.props.children
  }
}

// A component that will throw an error
function BuggyCounter() {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  if (counter === 3) {
    // Simulate a JS error
    throw new Error("I crashed when counter reached 3!")
  }

  return (
    <div className="text-center">
      <p className="mb-4">Counter: {counter}</p>
      <Button onClick={handleClick}>Increment</Button>
      <p className="mt-4 text-sm text-muted-foreground">
        {counter === 2 ? "⚠️ Warning: Next click will crash the component!" : "Click to increment the counter"}
      </p>
    </div>
  )
}

// Error fallback component
function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h3>
      <p className="text-red-600 mb-4">The component crashed due to an error.</p>
      <Button onClick={resetErrorBoundary} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reset
      </Button>
    </div>
  )
}

export default function ErrorBoundaryDemo() {
  const [key, setKey] = useState(0)

  // Reset the error boundary by changing the key
  const resetErrorBoundary = () => {
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">About Error Boundaries:</h3>
        <p className="text-sm">
          Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log
          those errors, and display a fallback UI instead of crashing the whole app.
        </p>
        <p className="text-sm mt-2">
          In this demo, the counter will throw an error when it reaches 3. The error boundary will catch this error and
          display a fallback UI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>With Error Boundary</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary key={key} fallback={<ErrorFallback resetErrorBoundary={resetErrorBoundary} />}>
              <BuggyCounter />
            </ErrorBoundary>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Without Error Boundary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              This component has no error boundary. If you had one here and it crashed, it would crash the entire app.
            </p>
            <div className="text-center">
              <Button
                onClick={() => {
                  alert("This would crash your app if we actually threw an error here!")
                }}
                variant="outline"
              >
                Simulate Error (Alert Only)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
