"use client"

import { useState, useEffect, useRef, useCallback, useMemo, useReducer, useLayoutEffect, useId } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { create } from "zustand"
import { Loader2 } from "lucide-react"

export default function HooksAndState() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Hooks & State Management</h2>
      <p className="text-muted-foreground mb-8">
        React hooks and state management techniques for handling component state and side effects.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="11. useState Hook"
          description="Manage local component state with the useState hook."
          level="beginner"
          docs="https://react.dev/reference/react/useState"
        >
          <UseStateDemo />
        </FeatureCard>

        <FeatureCard
          title="12. useEffect Hook"
          description="Perform side effects in function components with the useEffect hook."
          level="beginner"
          docs="https://react.dev/reference/react/useEffect"
        >
          <UseEffectDemo />
        </FeatureCard>

        <FeatureCard
          title="13. useRef Hook"
          description="Create a mutable reference that persists across renders."
          level="intermediate"
          docs="https://react.dev/reference/react/useRef"
        >
          <UseRefDemo />
        </FeatureCard>

        <FeatureCard
          title="14. useCallback Hook"
          description="Memoize functions to prevent unnecessary re-renders."
          level="intermediate"
          docs="https://react.dev/reference/react/useCallback"
        >
          <UseCallbackDemo />
        </FeatureCard>

        <FeatureCard
          title="15. useMemo Hook"
          description="Memoize expensive calculations to optimize performance."
          level="intermediate"
          docs="https://react.dev/reference/react/useMemo"
        >
          <UseMemoDemo />
        </FeatureCard>

        <FeatureCard
          title="16. useReducer Hook"
          description="Manage complex state logic with a reducer function."
          level="intermediate"
          docs="https://react.dev/reference/react/useReducer"
        >
          <UseReducerDemo />
        </FeatureCard>

        <FeatureCard
          title="17. useLayoutEffect Hook"
          description="Similar to useEffect, but fires synchronously after all DOM mutations."
          level="advanced"
          docs="https://react.dev/reference/react/useLayoutEffect"
        >
          <UseLayoutEffectDemo />
        </FeatureCard>

        <FeatureCard
          title="18. useId Hook"
          description="Generate unique IDs for accessibility attributes."
          level="intermediate"
          docs="https://react.dev/reference/react/useId"
        >
          <UseIdDemo />
        </FeatureCard>

        <FeatureCard
          title="19. Custom Hooks"
          description="Extract and reuse stateful logic between components."
          level="intermediate"
          docs="https://react.dev/learn/reusing-logic-with-custom-hooks"
        >
          <CustomHooksDemo />
        </FeatureCard>

        <FeatureCard
          title="20. Zustand State Management"
          description="Simple, fast, and scalable state management using Zustand."
          level="advanced"
          docs="https://github.com/pmndrs/zustand"
        >
          <ZustandDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 11. useState Hook Demo
function UseStateDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")
  const [isActive, setIsActive] = useState(false)

  // Using functional updates
  const increment = () => setCount((prevCount) => prevCount + 1)
  const decrement = () => setCount((prevCount) => prevCount - 1)

  // Using object state
  const [user, setUser] = useState({
    name: "",
    email: "",
  })

  const updateUser = (field: keyof typeof user, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Basic Counter</h3>
        <div className="flex items-center gap-4">
          <Button onClick={decrement} variant="outline">
            -
          </Button>
          <span className="text-xl font-medium">{count}</span>
          <Button onClick={increment} variant="outline">
            +
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Text Input</h3>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
        {text && <p className="text-sm">You typed: {text}</p>}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Toggle State</h3>
        <div className="flex items-center gap-2">
          <Switch checked={isActive} onCheckedChange={setIsActive} />
          <Label>Status: {isActive ? "Active" : "Inactive"}</Label>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Object State</h3>
        <div className="space-y-2">
          <Input value={user.name} onChange={(e) => updateUser("name", e.target.value)} placeholder="Name" />
          <Input value={user.email} onChange={(e) => updateUser("email", e.target.value)} placeholder="Email" />
          {(user.name || user.email) && (
            <div className="text-sm mt-2">
              <p>Name: {user.name || "(empty)"}</p>
              <p>Email: {user.email || "(empty)"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 12. useEffect Hook Demo
function UseEffectDemo() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  // Effect that runs on every render
  useEffect(() => {
    document.title = `Count: ${count}`
  })

  // Effect with dependencies
  useEffect(() => {
    if (search.trim() === "") {
      setResults([])
      return
    }

    // Simulate API call
    const timer = setTimeout(() => {
      setResults(Array.from({ length: 5 }, (_, i) => `Result ${i + 1} for "${search}"`))
    }, 500)

    // Cleanup function
    return () => clearTimeout(timer)
  }, [search])

  // Effect that runs only once (on mount)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    // Cleanup function (runs on unmount)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Document Title Effect</h3>
        <div className="flex items-center gap-4">
          <Button onClick={() => setCount(count + 1)} variant="outline">
            Increment ({count})
          </Button>
          <p className="text-sm">Check your browser tab title!</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Search with Debounce</h3>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        <div className="text-sm">
          {results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          ) : (
            search && <p>No results for "{search}"</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Window Resize Effect</h3>
        <p>Current window width: {windowWidth}px</p>
        <p className="text-sm text-muted-foreground">Resize your browser window to see this value change.</p>
      </div>
    </div>
  )
}

// 13. useRef Hook Demo
function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const countRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)
  const [inputValue, setInputValue] = useState("")

  // Update the ref without causing a re-render
  const incrementRefCount = () => {
    countRef.current += 1
    alert(`Current ref count: ${countRef.current}`)
  }

  // Force a re-render
  const incrementRenderCount = () => {
    setRenderCount(renderCount + 1)
  }

  // Focus the input
  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Ref persists between renders
  useEffect(() => {
    countRef.current += 1
  })

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">DOM Reference</h3>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Click the button to focus"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={focusInput}>Focus</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Mutable Reference</h3>
        <div className="space-y-2">
          <p>
            Render count (state): <span className="font-medium">{renderCount}</span>
          </p>
          <p>
            Ref count (doesn't trigger re-render): <span className="font-medium">{countRef.current}</span>
          </p>
          <div className="flex gap-2">
            <Button onClick={incrementRefCount} variant="outline">
              Increment Ref
            </Button>
            <Button onClick={incrementRenderCount}>Increment State</Button>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          useRef creates a mutable reference that persists across renders. Unlike state, updating a ref doesn't trigger
          a re-render.
        </p>
      </div>
    </div>
  )
}

// 14. useCallback Hook Demo
function UseCallbackDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")

  // This function is recreated on every render
  const regularIncrement = () => {
    setCount((c) => c + 1)
  }

  // This function is memoized and only recreated when dependencies change
  const memoizedIncrement = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  // This function depends on text, so it's recreated when text changes
  const alertWithText = useCallback(() => {
    alert(`Current text: ${text}`)
  }, [text])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Counter: {count}</h3>
        <div className="flex gap-2">
          <Button onClick={regularIncrement}>Regular Increment</Button>
          <Button onClick={memoizedIncrement} variant="outline">
            Memoized Increment
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Text with Dependency</h3>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
        <Button onClick={alertWithText}>Alert with Text</Button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Child Component with Callback</h3>
        <ExpensiveChild onClick={memoizedIncrement} />
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          useCallback memoizes a callback function, preventing it from being recreated on every render. This is useful
          when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary
          renders.
        </p>
      </div>
    </div>
  )
}

// Helper component for useCallback demo
function ExpensiveChild({ onClick }: { onClick: () => void }) {
  console.log("ExpensiveChild rendered")
  return (
    <div className="p-4 border rounded-md">
      <p className="mb-2">
        This is an expensive component that would re-render unnecessarily if the callback prop changes on every parent
        render.
      </p>
      <Button onClick={onClick}>Trigger Callback</Button>
    </div>
  )
}

// 15. useMemo Hook Demo
function UseMemoDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")
  const [list, setList] = useState<number[]>([])
  const [filterValue, setFilterValue] = useState(0)

  // Generate a list of numbers when count changes
  useEffect(() => {
    setList(Array.from({ length: count }, (_, i) => i + 1))
  }, [count])

  // Expensive calculation without memoization
  const expensiveCalculation = () => {
    console.log("Running expensive calculation...")
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += 1
    }
    return result + count
  }

  // Memoized expensive calculation
  const memoizedCalculation = useMemo(() => {
    console.log("Running memoized calculation...")
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += 1
    }
    return result + count
  }, [count])

  // Memoized filtered list
  const filteredList = useMemo(() => {
    console.log("Filtering list...")
    return list.filter((item) => item > filterValue)
  }, [list, filterValue])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Counter and Text Input</h3>
        <div className="flex gap-2">
          <Button onClick={() => setCount(count + 1)}>Increment ({count})</Button>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type to trigger re-render" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Expensive Calculations</h3>
        <div className="space-y-1">
          <p>
            Regular calculation: <span className="font-medium">{expensiveCalculation()}</span>
          </p>
          <p>
            Memoized calculation: <span className="font-medium">{memoizedCalculation}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            The regular calculation runs on every render, while the memoized one only runs when count changes.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Filtered List</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span>Filter values greater than:</span>
            <Input
              type="number"
              value={filterValue}
              onChange={(e) => setFilterValue(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <div className="text-sm">
            <p>List: {list.join(", ") || "(empty)"}</p>
            <p>Filtered: {filteredList.join(", ") || "(empty)"}</p>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          useMemo memoizes the result of a calculation, preventing it from being recalculated on every render. This is
          useful for expensive calculations or when deriving data from props or state.
        </p>
      </div>
    </div>
  )
}

// 16. useReducer Hook Demo
function UseReducerDemo() {
  // Define the reducer function
  type State = {
    count: number
    error: string | null
    loading: boolean
  }

  type Action =
    | { type: "INCREMENT" }
    | { type: "DECREMENT" }
    | { type: "RESET" }
    | { type: "SET_COUNT"; payload: number }
    | { type: "SET_ERROR"; payload: string }
    | { type: "CLEAR_ERROR" }
    | { type: "SET_LOADING"; payload: boolean }

  const initialState: State = {
    count: 0,
    error: null,
    loading: false,
  }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1, error: null }
      case "DECREMENT":
        if (state.count <= 0) {
          return { ...state, error: "Count cannot be negative" }
        }
        return { ...state, count: state.count - 1, error: null }
      case "RESET":
        return { ...state, count: 0, error: null }
      case "SET_COUNT":
        return { ...state, count: action.payload, error: null }
      case "SET_ERROR":
        return { ...state, error: action.payload }
      case "CLEAR_ERROR":
        return { ...state, error: null }
      case "SET_LOADING":
        return { ...state, loading: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [inputValue, setInputValue] = useState("")

  const handleSetCount = () => {
    const value = Number(inputValue)
    if (isNaN(value)) {
      dispatch({ type: "SET_ERROR", payload: "Please enter a valid number" })
    } else {
      dispatch({ type: "SET_COUNT", payload: value })
      setInputValue("")
    }
  }

  const simulateAsyncOperation = () => {
    dispatch({ type: "SET_LOADING", payload: true })
    setTimeout(() => {
      dispatch({ type: "INCREMENT" })
      dispatch({ type: "SET_LOADING", payload: false })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Counter with Reducer</h3>
        <div className="flex items-center gap-2">
          <Button onClick={() => dispatch({ type: "DECREMENT" })} disabled={state.loading} variant="outline">
            -
          </Button>
          <span className="text-xl font-medium w-8 text-center">{state.count}</span>
          <Button onClick={() => dispatch({ type: "INCREMENT" })} disabled={state.loading} variant="outline">
            +
          </Button>
          <Button onClick={() => dispatch({ type: "RESET" })} disabled={state.loading} variant="outline">
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Set Count</h3>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            type="number"
          />
          <Button onClick={handleSetCount} disabled={state.loading}>
            Set
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Async Operation</h3>
        <Button onClick={simulateAsyncOperation} disabled={state.loading}>
          {state.loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Increment Async"
          )}
        </Button>
      </div>

      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800">
          <p className="text-sm">{state.error}</p>
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        <p>
          useReducer is an alternative to useState for complex state logic. It's especially useful when the next state
          depends on the previous state or when you have multiple sub-values.
        </p>
      </div>
    </div>
  )
}

// 17. useLayoutEffect Hook Demo
function UseLayoutEffectDemo() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const boxRef = useRef<HTMLDivElement>(null)

  // useLayoutEffect runs synchronously after DOM mutations but before browser paint
  useLayoutEffect(() => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect()
      setWidth(Math.round(width))
      setHeight(Math.round(height))
    }
  }, [])

  // useEffect runs asynchronously after the browser has painted
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // This will cause a layout effect to run
  const changeSize = () => {
    if (boxRef.current) {
      boxRef.current.style.width = `${Math.floor(Math.random() * 100) + 100}px`
      boxRef.current.style.height = `${Math.floor(Math.random() * 100) + 100}px`
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Box Dimensions (measured with useLayoutEffect)</h3>
        <div
          ref={boxRef}
          className="border-2 border-dashed border-primary p-4 rounded-md"
          style={{ width: "200px", height: "100px" }}
        >
          <p>
            Width: {width}px, Height: {height}px
          </p>
        </div>
        <Button onClick={changeSize}>Randomize Size</Button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Mouse Position (tracked with useEffect)</h3>
        <p>
          X: {position.x}, Y: {position.y}
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          useLayoutEffect is similar to useEffect, but it fires synchronously after all DOM mutations and before the
          browser paints. This can be useful when you need to make DOM measurements or manipulations that should be
          visible immediately.
        </p>
      </div>
    </div>
  )
}

// 18. useId Hook Demo
function UseIdDemo() {
  // Generate unique IDs for form elements
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const checkboxId = useId()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={nameId}>Name</Label>
          <Input id={nameId} placeholder="Enter your name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor={emailId}>Email</Label>
          <Input id={emailId} type="email" placeholder="Enter your email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor={passwordId}>Password</Label>
          <Input id={passwordId} type="password" placeholder="Enter your password" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id={checkboxId} className="h-4 w-4 rounded border-gray-300" />
          <Label htmlFor={checkboxId}>I agree to the terms and conditions</Label>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          useId generates a unique ID string that can be used for accessibility attributes. The IDs are stable across
          server and client, making them perfect for form labels and ARIA attributes.
        </p>
        <p className="mt-2">
          Inspect the elements to see the generated IDs: {nameId}, {emailId}, {passwordId}, {checkboxId}
        </p>
      </div>
    </div>
  )
}

// 19. Custom Hooks Demo
function CustomHooksDemo() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="local-storage">
        <TabsList>
          <TabsTrigger value="local-storage">useLocalStorage</TabsTrigger>
          <TabsTrigger value="window-size">useWindowSize</TabsTrigger>
          <TabsTrigger value="debounce">useDebounce</TabsTrigger>
          <TabsTrigger value="interval">useInterval</TabsTrigger>
        </TabsList>

        <TabsContent value="local-storage" className="pt-4">
          <LocalStorageHookDemo />
        </TabsContent>

        <TabsContent value="window-size" className="pt-4">
          <WindowSizeHookDemo />
        </TabsContent>

        <TabsContent value="debounce" className="pt-4">
          <DebounceHookDemo />
        </TabsContent>

        <TabsContent value="interval" className="pt-4">
          <IntervalHookDemo />
        </TabsContent>
      </Tabs>

      <div className="text-sm text-muted-foreground">
        <p>
          Custom hooks let you extract component logic into reusable functions. They always start with "use" and can
          call other hooks.
        </p>
      </div>
    </div>
  )
}

// Custom hook: useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
      // Save state
      setStoredValue(valueToStore)
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Listen for changes to the item in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [key])

  return [storedValue, setValue] as const
}

// Custom hook: useWindowSize
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
  }, [])

  return windowSize
}

// Custom hook: useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Custom hook: useInterval
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// Demo components for custom hooks
function LocalStorageHookDemo() {
  const [name, setName] = useLocalStorage("name", "")
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name (persisted in localStorage)</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        {name && <p className="text-sm">Hello, {name}!</p>}
      </div>

      <div className="flex items-center gap-2">
        <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
        <Label htmlFor="dark-mode">Dark Mode: {darkMode ? "On" : "Off"}</Label>
      </div>

      <p className="text-sm text-muted-foreground">These values persist in localStorage. Try refreshing the page!</p>
    </div>
  )
}

function WindowSizeHookDemo() {
  const windowSize = useWindowSize()

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md">
        <h3 className="font-medium mb-2">Current Window Size</h3>
        <p>Width: {windowSize.width}px</p>
        <p>Height: {windowSize.height}px</p>
      </div>

      <p className="text-sm text-muted-foreground">
        Resize your browser window to see these values update in real-time.
      </p>
    </div>
  )
}

function DebounceHookDemo() {
  const [inputValue, setInputValue] = useState("")
  const debouncedValue = useDebounce(inputValue, 500)
  const [searchResults, setSearchResults] = useState<string[]>([])

  useEffect(() => {
    if (debouncedValue.trim() === "") {
      setSearchResults([])
      return
    }

    // Simulate API call
    setSearchResults(Array.from({ length: 5 }, (_, i) => `Result ${i + 1} for "${debouncedValue}"`))
  }, [debouncedValue])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search">Search (with 500ms debounce)</Label>
        <Input
          id="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type to search..."
        />
      </div>

      <div>
        <p className="text-sm mb-2">
          Input value: <span className="font-medium">{inputValue}</span>
        </p>
        <p className="text-sm mb-2">
          Debounced value: <span className="font-medium">{debouncedValue}</span>
        </p>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Search Results:</h4>
          <ul className="space-y-1 text-sm">
            {searchResults.map((result, index) => (
              <li key={index} className="p-2 bg-muted rounded-md">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function IntervalHookDemo() {
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)
  const [isRunning, setIsRunning] = useState(true)

  useInterval(
    () => {
      setCount(count + 1)
    },
    isRunning ? delay : null,
  )

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md text-center">
        <h3 className="font-medium mb-2">Counter: {count}</h3>
        <p className="text-sm text-muted-foreground mb-4">This counter increments every {delay}ms</p>
        <div className="flex justify-center gap-2">
          <Button onClick={() => setIsRunning(!isRunning)} variant={isRunning ? "default" : "outline"}>
            {isRunning ? "Pause" : "Resume"}
          </Button>
          <Button onClick={() => setCount(0)} variant="outline">
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="delay">Interval Delay: {delay}ms</Label>
        <Slider
          id="delay"
          min={100}
          max={2000}
          step={100}
          value={[delay]}
          onValueChange={(value) => setDelay(value[0])}
        />
      </div>
    </div>
  )
}

// 20. Zustand State Management Demo
// Define the store
interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementBy: (value: number) => void
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (value) => set((state) => ({ count: state.count + value })),
}))

function ZustandDemo() {
  // Use the store in components
  const { count, increment, decrement, reset, incrementBy } = useCounterStore()
  const [incrementValue, setIncrementValue] = useState(5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-medium mb-4">Counter with Zustand</h3>
              <div className="text-5xl font-bold mb-6">{count}</div>
              <div className="flex justify-center gap-2">
                <Button onClick={decrement} variant="outline">
                  -
                </Button>
                <Button onClick={increment} variant="outline">
                  +
                </Button>
                <Button onClick={reset} variant="outline">
                  Reset
                </Button>
              </div>
              <div className="mt-4 flex justify-center gap-2 items-center">
                <Input
                  type="number"
                  value={incrementValue}
                  onChange={(e) => setIncrementValue(Number(e.target.value) || 0)}
                  className="w-20"
                />
                <Button onClick={() => incrementBy(incrementValue)}>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Separate Components</h3>
            <div className="space-y-4">
              <CounterDisplay />
              <CounterControls />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Zustand is a small, fast, and scalable state management solution. It's simple to use and doesn't require
          providers or context. The state is accessible from anywhere in your application.
        </p>
      </div>
    </div>
  )
}

// Separate components that consume the Zustand store
function CounterDisplay() {
  // Only subscribe to the count
  const count = useCounterStore((state) => state.count)

  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">Display Component</h4>
      <p>
        Current count: <span className="font-bold text-xl">{count}</span>
      </p>
      <p className="text-sm text-muted-foreground mt-2">This component only subscribes to the count value</p>
    </div>
  )
}

function CounterControls() {
  // Only subscribe to the actions
  const { increment, decrement, reset } = useCounterStore()

  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">Controls Component</h4>
      <div className="flex gap-2">
        <Button onClick={decrement} size="sm" variant="outline">
          -
        </Button>
        <Button onClick={increment} size="sm" variant="outline">
          +
        </Button>
        <Button onClick={reset} size="sm" variant="outline">
          Reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-2">This component only subscribes to the actions</p>
    </div>
  )
}
