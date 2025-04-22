"use client"

import React from "react"

import { useState, useCallback, useMemo, memo, useEffect, useRef, Suspense, lazy } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { 
  Zap, 
  Cpu, 
  MemoryStick, 
  Network, 
  Timer,
  Code2
} from "lucide-react"

// Performance Demo Component
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

export default function PerformanceOptimization() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Performance Optimization</h2>
      <p className="text-muted-foreground mb-8">
        Techniques and patterns for optimizing React application performance.
      </p>

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
    </div>
  )
}

// 21. React.memo Demo
function MemoDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium">Parent Component</h3>
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <Button onClick={() => setCount(count + 1)} variant="outline">
                Increment Count: {count}
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <RegularChildComponent count={count} />
          <MemoizedChildComponent text={text} />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          React.memo is a higher-order component that memoizes the result of a component render. If the props haven't
          changed, React will skip rendering the component and reuse the last rendered result.
        </p>
        <p className="mt-2">
          In this example, the regular child re-renders on every parent render, while the memoized child only re-renders
          when its props (text) change.
        </p>
      </div>
    </div>
  )
}

// Regular component that re-renders on every parent render
function RegularChildComponent({ count }: { count: number }) {
  console.log("RegularChildComponent rendered")
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">Regular Component</h4>
      <p>Count: {count}</p>
      <p className="text-sm text-muted-foreground mt-2">This component re-renders whenever the parent renders</p>
    </div>
  )
}

// Memoized component that only re-renders when its props change
const MemoizedChildComponent = memo(function MemoizedChild({ text }: { text: string }) {
  console.log("MemoizedChildComponent rendered")
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">Memoized Component</h4>
      <p>Text: {text || "(empty)"}</p>
      <p className="text-sm text-muted-foreground mt-2">This component only re-renders when the text prop changes</p>
    </div>
  )
})

// 22. Virtualized Lists Demo
function VirtualizedListDemo() {
  const [items] = useState(() =>
    Array.from({ length: 10000 }, (_, index) => ({
      id: index,
      text: `Item ${index + 1}`,
      height: Math.floor(Math.random() * 50) + 50, // Random height between 50-100px
    })),
  )
  const [scrollTop, setScrollTop] = useState(0)
  const [filter, setFilter] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)

  // Constants for virtualization
  const itemHeight = 60
  const containerHeight = 400
  const overscan = 5

  // Filter items based on search
  const filteredItems = filter ? items.filter((item) => item.text.toLowerCase().includes(filter.toLowerCase())) : items

  // Calculate visible items
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(filteredItems.length - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + overscan)

  const visibleItems = filteredItems.slice(startIndex, endIndex + 1)
  const totalHeight = filteredItems.length * itemHeight

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">Virtualized List with {items.length.toLocaleString()} Items</h3>
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter items..." />
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="border rounded-md overflow-auto"
        style={{ height: containerHeight }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="border-b p-4 absolute w-full"
              style={{
                height: itemHeight,
                top: (startIndex + visibleItems.indexOf(item)) * itemHeight,
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Virtualized lists only render the items that are currently visible in the viewport, plus a few items above and
          below as a buffer (overscan). This dramatically improves performance when rendering large lists.
        </p>
        <p className="mt-2">
          Currently rendering {visibleItems.length} of {filteredItems.length} items
          {filter && ` (filtered from ${items.length})`}.
        </p>
      </div>
    </div>
  )
}

// 23. Code Splitting with lazy() Demo
// Lazy-loaded components
const LazyComponent1 = lazy(() => {
  // Simulate network delay
  return new Promise<{ default: React.ComponentType }>((resolve) =>
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Lazy Component 1</h3>
            <p>This component was loaded lazily when it was needed.</p>
          </div>
        ),
      })
    }, 1500),
  )
})

const LazyComponent2 = lazy(() => {
  // Simulate network delay
  return new Promise<{ default: React.ComponentType }>((resolve) =>
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Lazy Component 2</h3>
            <p>This is another lazily loaded component with different content.</p>
          </div>
        ),
      })
    }, 2000),
  )
})

function CodeSplittingDemo() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Code Splitting with React.lazy</h3>
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab("component1")}
            variant={activeTab === "component1" ? "default" : "outline"}
          >
            Load Component 1
          </Button>
          <Button
            onClick={() => setActiveTab("component2")}
            variant={activeTab === "component2" ? "default" : "outline"}
          >
            Load Component 2
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4 min-h-[200px]">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading component...</span>
            </div>
          }
        >
          {activeTab === "component1" && <LazyComponent1 />}
          {activeTab === "component2" && <LazyComponent2 />}
          {!activeTab && (
            <div className="text-center text-muted-foreground">Click a button above to load a component</div>
          )}
        </Suspense>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Code splitting with React.lazy allows you to split your code into smaller chunks that are loaded on demand.
          This improves the initial load time of your application by only loading the code that's needed.
        </p>
        <p className="mt-2">
          In this example, the components are loaded only when you click the corresponding button, and a loading
          indicator is shown during the loading process.
        </p>
      </div>
    </div>
  )
}

// 24. useTransition Hook Demo
function UseTransitionDemo() {
  const [isPending, startTransition] = React.useTransition()
  const [tab, setTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])

  // Simulate an expensive operation
  const handleSearch = (query: string) => {
    // Update the input immediately
    setSearchQuery(query)

    // Mark the search results update as a transition
    startTransition(() => {
      if (query.trim() === "") {
        setSearchResults([])
        return
      }

      // Simulate an expensive operation
      const results = []
      for (let i = 0; i < 5000; i++) {
        if (i % 500 === 0) {
          results.push(`Result ${i + 1} for "${query}"`)
        }
      }
      setSearchResults(results)
    })
  }

  // Simulate a tab change with expensive rendering
  const handleTabChange = (newTab: string) => {
    startTransition(() => {
      setTab(newTab)
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Search with useTransition</h3>
        <Input value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Type to search..." />
        <div className="h-40 overflow-auto border rounded-md p-2">
          {isPending ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <ul className="space-y-1">
              {searchResults.map((result, index) => (
                <li key={index} className="p-2 bg-muted rounded-md">
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
              {searchQuery ? "No results found" : "Type to search"}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Tab Switching with useTransition</h3>
        <div className="flex gap-2">
          <Button
            onClick={() => handleTabChange("home")}
            variant={tab === "home" ? "default" : "outline"}
            disabled={isPending}
          >
            Home
          </Button>
          <Button
            onClick={() => handleTabChange("profile")}
            variant={tab === "profile" ? "default" : "outline"}
            disabled={isPending}
          >
            Profile
          </Button>
          <Button
            onClick={() => handleTabChange("settings")}
            variant={tab === "settings" ? "default" : "outline"}
            disabled={isPending}
          >
            Settings
          </Button>
        </div>
        <div className="border rounded-md p-4 min-h-[100px]">
          {isPending ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Loading tab...</span>
            </div>
          ) : (
            <div>
              <h4 className="font-medium mb-2">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h4>
              <p>This is the {tab} tab content.</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          useTransition lets you mark some state updates as non-urgent, which allows the browser to yield to more urgent
          updates (like user input) before rendering the non-urgent update.
        </p>
        <p className="mt-2">
          In this example, the search input remains responsive even during the expensive search operation, and the UI
          shows a loading indicator during the transition.
        </p>
      </div>
    </div>
  )
}

// 25. useDeferredValue Hook Demo
function UseDeferredValueDemo() {
  const [text, setText] = useState("")
  const deferredText = React.useDeferredValue(text)
  const isStale = deferredText !== text

  // Simulate an expensive list rendering
  const items = useMemo(() => {
    console.log("Generating items with:", deferredText)
    return Array.from({ length: 5000 }, (_, i) => (
      <div key={i} className="p-2 border-b">
        {deferredText ? `${deferredText} - Item ${i + 1}` : `Item ${i + 1}`}
      </div>
    ))
  }, [deferredText])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Input with useDeferredValue</h3>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
        <div className="flex gap-4 text-sm">
          <div>
            Current value: <span className="font-medium">{text}</span>
          </div>
          <div>
            Deferred value: <span className="font-medium">{deferredText}</span>
          </div>
          {isStale && <div className="text-yellow-600">Stale UI - Updating...</div>}
        </div>
      </div>

      <div className="border rounded-md h-60 overflow-auto">
        <div style={{ opacity: isStale ? 0.7 : 1 }}>{items}</div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          useDeferredValue is similar to useTransition but for values instead of functions. It lets you defer updating a
          part of the UI, showing the old value until the new one is ready.
        </p>
        <p className="mt-2">
          In this example, the input remains responsive while the expensive list rendering is deferred. The stale UI is
          slightly dimmed to indicate that it's being updated.
        </p>
      </div>
    </div>
  )
}

// 26. Memoization Techniques Demo
function MemoizationTechniquesDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5])
  const [threshold, setThreshold] = useState(3)

  // 1. useMemo for expensive calculations
  const expensiveCalculation = useMemo(() => {
    console.log("Running expensive calculation...")
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += count
    }
    return result
  }, [count])

  // 2. useMemo for derived data
  const filteredItems = useMemo(() => {
    console.log("Filtering items...")
    return items.filter((item) => item > threshold)
  }, [items, threshold])

  // 3. useCallback for event handlers
  const handleAddItem = useCallback(() => {
    setItems((prevItems) => [...prevItems, prevItems.length + 1])
  }, [])

  // 4. useCallback with dependencies
  const handleRemoveItem = useCallback((index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">useMemo for Calculations</h3>
            <div className="flex gap-2 items-center">
              <Button onClick={() => setCount(count + 1)} variant="outline">
                Increment Count: {count}
              </Button>
              <span className="text-sm">
                Result: <span className="font-medium">{expensiveCalculation}</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Text Input (Non-dependency)</h3>
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type to trigger re-render" />
            <p className="text-sm">Typing here doesn't recalculate the memoized values</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">useMemo for Derived Data</h3>
            <div className="flex gap-2 items-center">
              <span>Filter threshold:</span>
              <Input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-20"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddItem} size="sm">
                Add Item
              </Button>
              <Button onClick={() => setItems([])} variant="outline" size="sm">
                Clear
              </Button>
            </div>
            <div className="border rounded-md p-2">
              <p className="text-sm mb-1">All items: {items.join(", ") || "(none)"}</p>
              <p className="text-sm">Filtered items: {filteredItems.join(", ") || "(none)"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">useCallback for Event Handlers</h3>
            <MemoizedItemList items={items} onRemoveItem={handleRemoveItem} />
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Effective memoization combines useMemo, useCallback, and React.memo to optimize performance:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>useMemo: Memoize expensive calculations and derived data</li>
          <li>useCallback: Memoize event handlers and functions passed to child components</li>
          <li>React.memo: Prevent unnecessary re-renders of components when props haven't changed</li>
        </ul>
      </div>
    </div>
  )
}

// Helper component for memoization techniques demo
const MemoizedItemList = memo(function ItemList({
  items,
  onRemoveItem,
}: {
  items: number[]
  onRemoveItem: (index: number) => void
}) {
  console.log("ItemList rendered")
  return (
    <div className="border rounded-md p-2">
      <p className="text-sm mb-2">Memoized Component (check console)</p>
      {items.length > 0 ? (
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span>Item {item}</span>
              <Button onClick={() => onRemoveItem(index)} variant="ghost" size="sm" className="h-6 w-6 p-0">
                ×
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No items</p>
      )}
    </div>
  )
})

// 27. Avoiding Reconciliation Demo
function AvoidingReconciliationDemo() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<{ id: number; text: string }[]>([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ])

  // Bad practice: Creating new objects in render
  const badObject = { value: count }

  // Good practice: Memoizing objects
  const goodObject = useMemo(() => ({ value: count }), [count])

  // Bad practice: Creating new arrays in render
  const badArray = [1, 2, 3, count]

  // Good practice: Memoizing arrays
  const goodArray = useMemo(() => [1, 2, 3, count], [count])

  // Bad practice: Inline function creation
  const badHandleClick = () => setCount(count + 1)

  // Good practice: Memoized function
  const goodHandleClick = useCallback(() => setCount(count + 1), [count])

  // Demonstrate key issues
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      text: `Item ${items.length + 1}`,
    }
    setItems([...items, newItem])
  }

  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Object and Array References</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button onClick={() => setCount(count + 1)} variant="outline">
                Increment Count: {count}
              </Button>
              <div className="text-sm space-y-1">
                <p>Bad object reference: {JSON.stringify(badObject)} (new every render)</p>
                <p>Good object reference: {JSON.stringify(goodObject)} (memoized)</p>
                <p>Bad array reference: {JSON.stringify(badArray)} (new every render)</p>
                <p>Good array reference: {JSON.stringify(goodArray)} (memoized)</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Component with Props</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs mb-1">New object every render:</p>
                  <ComponentWithObjectProp object={badObject} />
                </div>
                <div>
                  <p className="text-xs mb-1">Memoized object:</p>
                  <ComponentWithObjectProp object={goodObject} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Keys and Lists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={addItem} size="sm">
                Add Item
              </Button>
              <Button onClick={shuffleItems} variant="outline" size="sm">
                Shuffle Items
              </Button>
            </div>

            <div className="border rounded-md p-2">
              <h4 className="text-sm font-medium mb-2">Items with Stable Keys</h4>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.id} className="text-sm p-1 bg-muted rounded-sm">
                    {item.text} (ID: {item.id})
                  </li>
                ))}
              </ul>
            </div>

            <div className="border rounded-md p-2">
              <h4 className="text-sm font-medium mb-2">Anti-pattern: Index as Keys (don't do this)</h4>
              <ul className="space-y-1">
                {items.map((item, index) => (
                  <li key={index} className="text-sm p-1 bg-muted rounded-sm">
                    {item.text} (Index: {index})
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Avoiding unnecessary reconciliation is key to React performance. Best practices include:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Using stable object and array references with useMemo</li>
          <li>Memoizing callback functions with useCallback</li>
          <li>Using stable, unique keys for list items (not array indices)</li>
          <li>Avoiding creating new objects and functions during render</li>
          <li>Using React.memo for pure functional components</li>
        </ul>
      </div>
    </div>
  )
}

// Helper component for avoiding reconciliation demo
const ComponentWithObjectProp = memo(function ComponentWithObjectProp({
  object,
}: {
  object: { value: number }
}) {
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current += 1
  })

  return (
    <div className="p-2 border rounded-md text-xs">
      <p>Value: {object.value}</p>
      <p>Renders: {renderCount.current}</p>
    </div>
  )
})

// 28. Debouncing and Throttling Demo
function DebouncingThrottlingDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("")
  const [throttledTerm, setThrottledTerm] = useState("")
  const [normalCount, setNormalCount] = useState(0)
  const [debouncedCount, setDebouncedCount] = useState(0)
  const [throttledCount, setThrottledCount] = useState(0)

  // Debounce function
  const debounce = useCallback((fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }, [])

  // Throttle function
  const throttle = useCallback((fn: Function, limit: number) => {
    let inThrottle: boolean
    return (...args: any[]) => {
      if (!inThrottle) {
        fn(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }, [])

  // Create debounced and throttled handlers
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedTerm(value)
      setDebouncedCount((prev) => prev + 1)
    }, 500),
    [debounce],
  )

  const throttledSearch = useCallback(
    throttle((value: string) => {
      setThrottledTerm(value)
      setThrottledCount((prev) => prev + 1)
    }, 500),
    [throttle],
  )

  // Update all values when search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setNormalCount((prev) => prev + 1)
    debouncedSearch(value)
    throttledSearch(value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Search Input</h3>
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Type to see debouncing and throttling in action..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Normal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Value: {searchTerm}</p>
            <p className="text-sm">Updates: {normalCount}</p>
            <p className="text-xs text-muted-foreground mt-2">Updates on every keystroke</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Debounced (500ms)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Value: {debouncedTerm}</p>
            <p className="text-sm">Updates: {debouncedCount}</p>
            <p className="text-xs text-muted-foreground mt-2">Updates after typing stops for 500ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Throttled (500ms)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Value: {throttledTerm}</p>
            <p className="text-sm">Updates: {throttledCount}</p>
            <p className="text-xs text-muted-foreground mt-2">Updates at most once every 500ms</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Debouncing and throttling are techniques to control how many times a function is called:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Debouncing:</strong> Delays executing a function until after a certain amount of time has passed
            since the last time it was invoked. Useful for search inputs, resizing, etc.
          </li>
          <li>
            <strong>Throttling:</strong> Limits the number of times a function can be called in a given time period.
            Useful for scroll events, mousemove, etc.
          </li>
        </ul>
      </div>
    </div>
  )
}

// 29. Web Workers Demo
function WebWorkersDemo() {
  const [number, setNumber] = useState(40)
  const [fibResult, setFibResult] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [useWorker, setUseWorker] = useState(true)

  // Calculate Fibonacci in the main thread (will block UI)
  const calculateFibonacciMainThread = (n: number): number => {
    if (n <= 1) return n
    return calculateFibonacciMainThread(n - 1) + calculateFibonacciMainThread(n - 2)
  }

  // Calculate using main thread
  const handleCalculateMainThread = () => {
    setIsCalculating(true)
    setFibResult(null)

    // Use setTimeout to allow UI to update before blocking
    setTimeout(() => {
      const startTime = performance.now()
      const result = calculateFibonacciMainThread(number)
      const endTime = performance.now()
      setFibResult(result)
      setIsCalculating(false)
      console.log(`Main thread calculation took ${endTime - startTime}ms`)
    }, 10)
  }

  // Calculate using web worker
  const handleCalculateWorker = () => {
    setIsCalculating(true)
    setFibResult(null)

    // In a real app, you'd create a proper worker file
    // For this demo, we'll simulate a worker with setTimeout
    setTimeout(() => {
      const startTime = performance.now()
      const result = calculateFibonacciMainThread(number)
      const endTime = performance.now()
      setFibResult(result)
      setIsCalculating(false)
      console.log(`"Worker" calculation took ${endTime - startTime}ms`)
    }, 10)
  }

  const handleCalculate = () => {
    if (useWorker) {
      handleCalculateWorker()
    } else {
      handleCalculateMainThread()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Fibonacci Calculator</h3>
        <div className="flex gap-2 items-center">
          <span>Calculate Fibonacci number:</span>
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            className="w-20"
            min={1}
            max={45}
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="use-worker"
            checked={useWorker}
            onChange={(e) => setUseWorker(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="use-worker">Use Web Worker (simulated)</label>
        </div>
        <Button onClick={handleCalculate} disabled={isCalculating}>
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate"
          )}
        </Button>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Result</h4>
        {fibResult !== null ? (
          <p>
            Fibonacci({number}) = <span className="font-bold">{fibResult}</span>
          </p>
        ) : (
          <p className="text-muted-foreground">
            {isCalculating ? "Calculating..." : "Click Calculate to see the result"}
          </p>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Web Workers allow you to run JavaScript in background threads, keeping the main thread responsive for UI
          updates. They're ideal for CPU-intensive tasks like:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Complex calculations</li>
          <li>Data processing</li>
          <li>Image manipulation</li>
          <li>Parsing large files</li>
        </ul>
        <p className="mt-2">
          Note: This demo simulates a Web Worker for demonstration purposes. In a real application, you would create a
          separate worker file and use the Worker API.
        </p>
      </div>
    </div>
  )
}

// 30. Intersection Observer Demo
function IntersectionObserverDemo() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  // Create items
  const items = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        color: `hsl(${(i * 20) % 360}, 70%, 80%)`,
      })),
    [],
  )

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const currentRefs = observerRefs.current

    // Create an observer for each item
    currentRefs.forEach((element, id) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(id))
            } else {
              setVisibleItems((prev) => {
                const newSet = new Set(prev)
                newSet.delete(id)
                return newSet
              })
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(element)
      observers.push(observer)
    })

    // Cleanup
    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Set up refs for each item
  const setRef = (id: number) => (el: HTMLDivElement | null) => {
    if (el) {
      observerRefs.current.set(id, el)
    } else {
      observerRefs.current.delete(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Scroll to see items appear</h3>
        <div className="border rounded-md h-60 overflow-auto p-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                ref={setRef(item.id)}
                className="h-40 rounded-md flex items-center justify-center transition-all duration-500"
                style={{
                  backgroundColor: item.color,
                  opacity: visibleItems.has(item.id) ? 1 : 0.3,
                  transform: visibleItems.has(item.id) ? "scale(1) translateX(0)" : "scale(0.9) translateX(-20px)",
                }}
              >
                <p className="text-lg font-bold">Item {item.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Currently Visible Items</h4>
        <div className="flex flex-wrap gap-2">
          {Array.from(visibleItems)
            .sort((a, b) => a - b)
            .map((id) => (
              <span
                key={id}
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `hsl(${(id * 20) % 360}, 70%, 80%)` }}
              >
                Item {id}
              </span>
            ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          The Intersection Observer API provides a way to asynchronously observe changes in the intersection of an
          element with its parent or the viewport. It's useful for:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Lazy loading images and other content</li>
          <li>Implementing infinite scroll</li>
          <li>Triggering animations when elements come into view</li>
          <li>Tracking visibility for analytics</li>
          <li>Implementing "sticky" elements</li>
        </ul>
      </div>
    </div>
  )
}
