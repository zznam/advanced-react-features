"use client"

import { useState, useMemo, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import { 
  Cpu,
  TestTube2,
  Network,
  Code2,
  Package,
  GitBranch,
  Users,
  Zap,
  MemoryStick,
  Timer
} from "lucide-react"

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

// State Machine Demo
function StateMachineDemo() {
  const machine = createStateMachine()
  const [successCount, setSuccessCount] = useState(0)

  const handleFetch = () => {
    machine.transition("FETCH")
    // Simulate API call with deterministic success/failure based on count
    setTimeout(() => {
      if (successCount % 2 === 0) {
        machine.transition("RESOLVE")
      } else {
        machine.transition("REJECT")
      }
      setSuccessCount(prev => prev + 1)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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

// Testing Demo
function TestingDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Component Under Test</h4>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCount((c) => c - 1)}
            data-testid="decrement"
          >
            -
          </Button>
          <span className="text-lg font-medium" data-testid="count">
            {count}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCount((c) => c + 1)}
            data-testid="increment"
          >
            +
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Test Example</h4>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          {`// Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

test('Counter component', () => {
  render(<Counter initialValue={5} />)
  
  // Initial state
  expect(screen.getByTestId('count')).toHaveTextContent('5')
  
  // Increment
  fireEvent.click(screen.getByTestId('increment'))
  expect(screen.getByTestId('count')).toHaveTextContent('6')
  
  // Decrement
  fireEvent.click(screen.getByTestId('decrement'))
  expect(screen.getByTestId('count')).toHaveTextContent('5')
})`}
        </pre>
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

// Performance Demo
function PerformanceDemo() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([1, 2, 3, 4, 5])

  // Memoized value
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...')
    return items.reduce((acc, curr) => acc + curr, 0)
  }, [items])

  // Memoized callback
  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, prev.length + 1])
  }, [])

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Memoization Demo</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount((c) => c + 1)}
            >
              Re-render ({count})
            </Button>
            <span className="text-sm text-muted-foreground">
              Expensive value: {expensiveValue}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddItem}
            >
              Add Item
            </Button>
            <span className="text-sm text-muted-foreground">
              Items: {items.join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Code Splitting Example</h4>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          {`// Using React.lazy for code splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  )
}`}
        </pre>
      </div>
    </div>
  )
}

export default function AdvancedPatterns() {
  const [activeTab, setActiveTab] = useState("state-machines")

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Advanced React Patterns</h1>
        <p className="text-muted-foreground text-lg">
          Explore advanced patterns and techniques for building robust React applications.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="state-machines" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            State Machines
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube2 className="h-4 w-4" />
            Testing
          </TabsTrigger>
          <TabsTrigger value="micro-frontends" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Micro Frontends
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="state-machines">
          <div className="grid grid-cols-1 gap-6">
            <FeatureCard
              title="State Machines"
              description="Implement complex state logic using finite state machines."
              level="advanced"
              docs="https://xstate.js.org/docs/"
            >
              <StateMachineDemo />
            </FeatureCard>
          </div>
        </TabsContent>

        <TabsContent value="testing">
          <div className="grid grid-cols-1 gap-6">
            <FeatureCard
              title="Testing Patterns"
              description="Advanced testing strategies for React applications."
              level="advanced"
              docs="https://reactjs.org/docs/testing.html"
            >
              <TestingDemo />
            </FeatureCard>
          </div>
        </TabsContent>

        <TabsContent value="micro-frontends">
          <div className="grid grid-cols-1 gap-6">
            <FeatureCard
              title="Module Federation"
              description="Share code between applications using Webpack's Module Federation."
              level="advanced"
              docs="https://webpack.js.org/concepts/module-federation/"
            >
              <MicroFrontendDemo />
            </FeatureCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Independent Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li>• Deploy features independently</li>
                      <li>• Rollback specific features</li>
                      <li>• A/B testing capabilities</li>
                      <li>• Gradual rollout</li>
                    </ul>
                    <div className="border rounded-md p-4 bg-muted/50">
                      <h4 className="font-medium mb-2">Deployment Example</h4>
                      <pre className="text-xs overflow-x-auto">
                        {`// webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'featureA',
      filename: 'remoteEntry.js',
      exposes: {
        './FeatureA': './src/FeatureA',
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    Technology Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li>• Framework agnostic</li>
                      <li>• Mix and match technologies</li>
                      <li>• Upgrade independently</li>
                      <li>• Experiment with new tech</li>
                    </ul>
                    <div className="border rounded-md p-4 bg-muted/50">
                      <h4 className="font-medium mb-2">Tech Stack Example</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-background rounded">
                          <div className="font-medium">Frontend A</div>
                          <div>React 18</div>
                          <div>TypeScript</div>
                          <div>Tailwind</div>
                        </div>
                        <div className="p-2 bg-background rounded">
                          <div className="font-medium">Frontend B</div>
                          <div>Vue 3</div>
                          <div>JavaScript</div>
                          <div>SCSS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Team Organization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li>• Autonomous teams</li>
                      <li>• Clear ownership</li>
                      <li>• Parallel development</li>
                      <li>• Reduced conflicts</li>
                    </ul>
                    <div className="border rounded-md p-4 bg-muted/50">
                      <h4 className="font-medium mb-2">Team Structure</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Team A: Feature Development</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>Team B: Core Platform</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span>Team C: Shared Components</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <FeatureCard
              title="Performance Patterns"
              description="Advanced techniques for optimizing React applications."
              level="advanced"
              docs="https://reactjs.org/docs/optimizing-performance.html"
            >
              <PerformanceDemo />
            </FeatureCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    Rendering Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• React.memo</li>
                    <li>• useMemo</li>
                    <li>• useCallback</li>
                    <li>• Virtualization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-4 w-4" />
                    Network Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Code splitting</li>
                    <li>• Lazy loading</li>
                    <li>• Prefetching</li>
                    <li>• Caching</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MemoryStick className="h-4 w-4" />
                    Memory Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Cleanup effects</li>
                    <li>• Event listeners</li>
                    <li>• Large lists</li>
                    <li>• Memory leaks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 