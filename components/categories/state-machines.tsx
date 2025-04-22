"use client"

import { useState, useCallback } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw, CheckCircle, XCircle } from "lucide-react"

// State Machine Types
type State = "idle" | "loading" | "success" | "error"
type Event = "FETCH" | "RESOLVE" | "REJECT" | "RETRY"

interface StateMachine {
  current: State
  transition: (event: Event) => void
}

function createStateMachine(): StateMachine {
  const [state, setState] = useState<State>("idle")

  const transition = useCallback((event: Event) => {
    setState((current) => {
      switch (current) {
        case "idle":
          if (event === "FETCH") return "loading"
          return current
        case "loading":
          if (event === "RESOLVE") return "success"
          if (event === "REJECT") return "error"
          return current
        case "success":
          if (event === "FETCH") return "loading"
          return current
        case "error":
          if (event === "RETRY") return "loading"
          if (event === "FETCH") return "loading"
          return current
        default:
          return current
      }
    })
  }, [])

  return { current: state, transition }
}

function StateMachineDemo() {
  const machine = createStateMachine()

  const handleFetch = () => {
    machine.transition("FETCH")
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.5) {
        machine.transition("RESOLVE")
      } else {
        machine.transition("REJECT")
      }
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {machine.current === "idle" && <RefreshCw className="h-4 w-4" />}
          {machine.current === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {machine.current === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
          {machine.current === "error" && <XCircle className="h-4 w-4 text-red-500" />}
          <span className="font-medium">Current State: {machine.current}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFetch}
            disabled={machine.current === "loading"}
          >
            Fetch Data
          </Button>
          {machine.current === "error" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => machine.transition("RETRY")}
            >
              Retry
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">State Transitions</h4>
        <div className="space-y-2 text-sm">
          <p>idle → loading (on FETCH)</p>
          <p>loading → success (on RESOLVE)</p>
          <p>loading → error (on REJECT)</p>
          <p>error → loading (on RETRY or FETCH)</p>
          <p>success → loading (on FETCH)</p>
        </div>
      </div>
    </div>
  )
}

// Micro Frontend Demo
function MicroFrontendDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Micro Frontend A</h4>
        <p className="text-sm text-muted-foreground mb-4">
          This component simulates a micro frontend with its own state.
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCount((c) => c - 1)}
          >
            -
          </Button>
          <span className="text-lg font-medium">{count}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCount((c) => c + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Module Federation Example</h4>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          {`// webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Counter': './src/components/Counter',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
};`}
        </pre>
      </div>
    </div>
  )
}

export default function StateMachines() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">State Machines & Micro Frontends</h2>
      <p className="text-muted-foreground mb-8">
        Advanced patterns for managing complex state and building scalable applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="State Machines"
          description="Implement complex state logic using finite state machines."
          level="advanced"
          docs="https://xstate.js.org/docs/"
        >
          <StateMachineDemo />
        </FeatureCard>

        <FeatureCard
          title="Micro Frontends"
          description="Build scalable applications using micro frontend architecture."
          level="advanced"
          docs="https://webpack.js.org/concepts/module-federation/"
        >
          <MicroFrontendDemo />
        </FeatureCard>
      </div>
    </div>
  )
} 