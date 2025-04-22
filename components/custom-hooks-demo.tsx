"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

// Custom hook for form input
function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange,
    reset: () => setValue(initialValue),
  }
}

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

// Custom hook for previous value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// Custom hook for async operations
function useAsync<T, E = string>(asyncFunction: () => Promise<T>, immediate = true) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the function is not recreated on each render.
  const execute = async () => {
    setStatus("pending")
    setValue(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setValue(response)
      setStatus("success")
    } catch (error) {
      setError(error as E)
      setStatus("error")
    }
  }

  // Call execute if immediate is true
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate])

  return { execute, status, value, error }
}

// Demo component for form input hook
function FormInputDemo() {
  const nameInput = useFormInput("")
  const emailInput = useFormInput("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Submitted: ${nameInput.value}, ${emailInput.value}`)
  }

  const handleReset = () => {
    nameInput.reset()
    emailInput.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>useFormInput Hook</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...nameInput} placeholder="Enter your name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...emailInput} placeholder="Enter your email" />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Demo component for window size hook
function WindowSizeDemo() {
  const windowSize = useWindowSize()

  return (
    <Card>
      <CardHeader>
        <CardTitle>useWindowSize Hook</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="mb-2">Current Window Dimensions:</p>
          <div className="flex justify-center gap-4">
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">Width</p>
              <p className="text-xl">{windowSize.width}px</p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">Height</p>
              <p className="text-xl">{windowSize.height}px</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Resize your browser window to see values change</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Demo component for previous value hook
function PreviousValueDemo() {
  const [count, setCount] = useState(0)
  const previousCount = usePrevious(count)

  return (
    <Card>
      <CardHeader>
        <CardTitle>usePrevious Hook</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="flex justify-center gap-8 mb-4">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-2xl">{count}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Previous</p>
              <p className="text-2xl">{previousCount ?? "None"}</p>
            </div>
          </div>
          <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Demo component for async hook
function AsyncDemo() {
  // Simulate an API call
  const fetchData = () =>
    new Promise<{ message: string }>((resolve) => {
      setTimeout(() => {
        resolve({ message: "Data successfully loaded!" })
      }, 2000)
    })

  const { status, value, error, execute } = useAsync(fetchData, false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>useAsync Hook</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="h-20 flex items-center justify-center">
            {status === "idle" && <p>Click the button to load data</p>}
            {status === "pending" && (
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <p>Loading...</p>
              </div>
            )}
            {status === "success" && <p className="text-green-600">{value?.message}</p>}
            {status === "error" && <p className="text-red-600">Error: {error}</p>}
          </div>
          <Button onClick={execute} disabled={status === "pending"}>
            {status === "pending" ? "Loading..." : "Fetch Data"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CustomHooksDemo() {
  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">About Custom Hooks:</h3>
        <p className="text-sm">
          Custom Hooks are a mechanism to reuse stateful logic between components. They follow the same rules as React's
          built-in Hooks and always start with "use" to indicate they are Hooks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInputDemo />
        <WindowSizeDemo />
        <PreviousValueDemo />
        <AsyncDemo />
      </div>
    </div>
  )
}
