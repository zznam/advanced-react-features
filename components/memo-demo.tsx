"use client"

import { useState, useMemo, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MemoDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")

  // Expensive calculation that should only run when count changes
  const expensiveCalculation = useMemo(() => {
    console.log("Running expensive calculation...")
    // Simulate expensive operation
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += count
    }
    return result
  }, [count])

  // Memoized callback that only changes when text changes
  const handleButtonClick = useCallback(() => {
    console.log("Button clicked with text:", text)
    alert(`Current text: ${text}`)
  }, [text])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Parent Component</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="mb-2">Count: {count}</p>
                <Button onClick={() => setCount((c) => c + 1)}>Increment Count</Button>
              </div>

              <div>
                <p className="mb-2">Text Input:</p>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type something..."
                  className="mb-2"
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Expensive calculation result (useMemo): {expensiveCalculation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <MemoizedChildComponent text={text} onButtonClick={handleButtonClick} />

          <NonMemoizedChildComponent count={count} />
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">How to observe the optimization:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open your browser console to see render logs</li>
          <li>Change the text input - only the memoized component with text dependency will re-render</li>
          <li>Click "Increment Count" - only the non-memoized component and parent will re-render</li>
          <li>The expensive calculation only runs when count changes</li>
        </ol>
      </div>
    </div>
  )
}

// Memoized component that only re-renders when its props change
const MemoizedChildComponent = memo(function MemoizedChild({
  text,
  onButtonClick,
}: {
  text: string
  onButtonClick: () => void
}) {
  console.log("Rendering MemoizedChildComponent")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Memoized Child (React.memo)</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">This component only re-renders when text or onButtonClick changes.</p>
        <p className="mb-2">Current text: {text || "(empty)"}</p>
        <Button onClick={onButtonClick}>Alert Current Text</Button>
      </CardContent>
    </Card>
  )
})

// Regular component that re-renders whenever parent re-renders
function NonMemoizedChildComponent({ count }: { count: number }) {
  console.log("Rendering NonMemoizedChildComponent")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Non-Memoized Child</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">This component re-renders on every parent render.</p>
        <p>Current count: {count}</p>
      </CardContent>
    </Card>
  )
}
