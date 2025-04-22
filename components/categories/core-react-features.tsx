"use client"

import React from "react"

import { useState, useRef, useEffect, createContext, useContext, forwardRef, useImperativeHandle } from "react"
import { createPortal } from "react-dom"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

// Create a context for the theme feature
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
})

export default function CoreReactFeatures() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Core React Features</h2>
      <p className="text-muted-foreground mb-8">
        Fundamental React features that form the building blocks of React applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="1. JSX and Components"
          description="JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
          level="beginner"
          docs="https://react.dev/learn/writing-markup-with-jsx"
        >
          <JSXDemo />
        </FeatureCard>

        <FeatureCard
          title="2. Props and State"
          description="Props are passed to components from their parent, while state is managed within a component."
          level="beginner"
          docs="https://react.dev/learn/state-a-components-memory"
        >
          <PropsAndStateDemo />
        </FeatureCard>

        <FeatureCard
          title="3. Event Handling"
          description="React uses synthetic events to handle user interactions consistently across browsers."
          level="beginner"
          docs="https://react.dev/learn/responding-to-events"
        >
          <EventHandlingDemo />
        </FeatureCard>

        <FeatureCard
          title="4. Conditional Rendering"
          description="Render different UI elements based on conditions using JavaScript operators."
          level="beginner"
          docs="https://react.dev/learn/conditional-rendering"
        >
          <ConditionalRenderingDemo />
        </FeatureCard>

        <FeatureCard
          title="5. Lists and Keys"
          description="Render lists of items efficiently with unique keys to help React identify changes."
          level="beginner"
          docs="https://react.dev/learn/rendering-lists"
        >
          <ListsAndKeysDemo />
        </FeatureCard>

        <FeatureCard
          title="6. Context API"
          description="Share values between components without explicitly passing props through every level."
          level="intermediate"
          docs="https://react.dev/learn/passing-data-deeply-with-context"
        >
          <ContextAPIDemo />
        </FeatureCard>

        <FeatureCard
          title="7. Refs and the DOM"
          description="Access and manipulate DOM elements directly with refs."
          level="intermediate"
          docs="https://react.dev/learn/referencing-values-with-refs"
        >
          <RefsDemo />
        </FeatureCard>

        <FeatureCard
          title="8. Portals"
          description="Render children into a DOM node that exists outside the DOM hierarchy of the parent component."
          level="advanced"
          docs="https://react.dev/reference/react-dom/createPortal"
        >
          <PortalsDemo />
        </FeatureCard>

        <FeatureCard
          title="9. Error Boundaries"
          description="Catch JavaScript errors anywhere in the component tree and display a fallback UI."
          level="advanced"
          docs="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
        >
          <ErrorBoundaryDemo />
        </FeatureCard>

        <FeatureCard
          title="10. forwardRef and useImperativeHandle"
          description="Forward refs to child components and customize the instance value exposed to parent components."
          level="advanced"
          docs="https://react.dev/reference/react/forwardRef"
        >
          <ForwardRefDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 1. JSX and Components Demo
function JSXDemo() {
  // JSX expressions
  const name = "React"
  const element = <h1>Hello, {name}!</h1>

  // Component composition
  function Greeting({ name }: { name: string }) {
    return <p className="text-lg">Welcome to {name} advanced features!</p>
  }

  return (
    <div className="space-y-4">
      {element}
      <Greeting name="React" />
      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          JSX lets you write HTML-like syntax in JavaScript. It gets transformed into React.createElement() calls during
          build.
        </p>
      </div>
    </div>
  )
}

// 2. Props and State Demo
function PropsAndStateDemo() {
  const [count, setCount] = useState(0)

  function Counter({ initialCount = 0, label }: { initialCount?: number; label: string }) {
    const [count, setCount] = useState(initialCount)
    return (
      <div className="border p-4 rounded-md">
        <h3 className="font-medium mb-2">{label}</h3>
        <p>Count: {count}</p>
        <Button size="sm" onClick={() => setCount(count + 1)} className="mt-2">
          Increment
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Counter label="Counter A" initialCount={5} />
        <Counter label="Counter B" initialCount={10} />
      </div>
      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          Props are passed down from parent components (like initialCount and label), while state (the count variable)
          is managed within each component instance.
        </p>
      </div>
    </div>
  )
}

// 3. Event Handling Demo
function EventHandlingDemo() {
  const [inputValue, setInputValue] = useState("")
  const [submittedValue, setSubmittedValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedValue(inputValue)
  }

  const handleButtonClick = (message: string, e: React.MouseEvent) => {
    alert(`${message} - Button clicked at position: ${e.clientX}, ${e.clientY}`)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
          />
          <Button type="submit">Submit</Button>
        </div>
        {submittedValue && <p>You submitted: {submittedValue}</p>}
      </form>

      <div>
        <Button variant="outline" onClick={(e) => handleButtonClick("Hello from event handler", e)} className="mt-2">
          Click with parameters
        </Button>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          React events are synthetic events that normalize browser behavior. They can be used with parameters and have
          access to the event object.
        </p>
      </div>
    </div>
  )
}

// 4. Conditional Rendering Demo
function ConditionalRenderingDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [userType, setUserType] = useState<"admin" | "user" | "guest">("guest")

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setIsLoggedIn(!isLoggedIn)} variant={isLoggedIn ? "default" : "outline"}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </Button>
        <Button onClick={() => setShowMessage(!showMessage)} variant="outline">
          Toggle Message
        </Button>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setUserType("admin")} variant={userType === "admin" ? "default" : "outline"} size="sm">
          Admin
        </Button>
        <Button onClick={() => setUserType("user")} variant={userType === "user" ? "default" : "outline"} size="sm">
          User
        </Button>
        <Button onClick={() => setUserType("guest")} variant={userType === "guest" ? "default" : "outline"} size="sm">
          Guest
        </Button>
      </div>

      <div className="p-4 border rounded-md">
        {/* If/else with ternary operator */}
        <p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>

        {/* Conditional rendering with && operator */}
        {showMessage && <p className="text-green-600 mt-2">This message is conditionally rendered!</p>}

        {/* Multiple conditions with if-else chains */}
        <div className="mt-2">
          {userType === "admin" ? (
            <p className="text-red-600">Admin Dashboard (Full Access)</p>
          ) : userType === "user" ? (
            <p className="text-blue-600">User Dashboard (Limited Access)</p>
          ) : (
            <p className="text-gray-600">Guest View (Read Only)</p>
          )}
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          React supports various ways to conditionally render content: ternary expressions, logical && operator, and
          if/else statements outside JSX.
        </p>
      </div>
    </div>
  )
}

// 5. Lists and Keys Demo
function ListsAndKeysDemo() {
  const [items, setItems] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build an app" },
    { id: 3, text: "Deploy to production" },
  ])
  const [newItemText, setNewItemText] = useState("")

  const addItem = () => {
    if (newItemText.trim()) {
      setItems([...items, { id: Date.now(), text: newItemText }])
      setNewItemText("")
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="New item..."
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <Button onClick={addItem}>Add</Button>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-2 border rounded-md">
            <span>{item.text}</span>
            <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          When rendering lists in React, each item should have a unique "key" prop to help React identify which items
          have changed. Using array indices as keys is not recommended if the order of items may change.
        </p>
      </div>
    </div>
  )
}

// 6. Context API Demo
function ContextAPIDemo() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Current Theme: {theme}</h3>
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>

        <div className="border rounded-md p-4">
          <ThemedComponent />
        </div>

        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm">
            Context provides a way to pass data through the component tree without having to pass props down manually at
            every level. This is useful for themes, user data, or other global state.
          </p>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

function ThemedComponent() {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`p-4 rounded-md ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      } transition-colors`}
    >
      <h4 className="font-medium mb-2">Themed Component</h4>
      <p>This component is using the theme from context: {theme}</p>
      <NestedThemedComponent />
    </div>
  )
}

function NestedThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="mt-4 p-3 border rounded-md">
      <h5 className="font-medium mb-2">Nested Component</h5>
      <p className="text-sm">
        This deeply nested component also has access to the theme ({theme}) without prop drilling.
      </p>
      <Button size="sm" onClick={toggleTheme} className="mt-2">
        Toggle Theme
      </Button>
    </div>
  )
}

// 7. Refs and the DOM Demo
function RefsDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const measureDiv = () => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect()
      setDimensions({ width: Math.round(width), height: Math.round(height) })
    }
  }

  useEffect(() => {
    // Measure on mount
    measureDiv()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Input ref={inputRef} placeholder="Focus me with the button" />
        <Button onClick={focusInput}>Focus</Button>
      </div>

      <div ref={divRef} className="border p-4 rounded-md mt-4 resize-x overflow-auto min-w-[200px] max-w-full">
        <p>This div can be resized horizontally. Measure it with the button below.</p>
        <div className="mt-2">
          <Button size="sm" onClick={measureDiv}>
            Measure
          </Button>
          {dimensions.width > 0 && (
            <p className="mt-2 text-sm">
              Dimensions: {dimensions.width}px × {dimensions.height}px
            </p>
          )}
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          Refs provide a way to access DOM nodes or React elements created in the render method. They're useful for
          managing focus, measuring elements, or integrating with third-party DOM libraries.
        </p>
      </div>
    </div>
  )
}

// 8. Portals Demo
function PortalsDemo() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-4">
      <div className="overflow-hidden h-40 border rounded-md p-4 relative">
        <p className="mb-4">
          This container has <code>overflow: hidden</code> applied to it.
        </p>

        <Button onClick={() => setShowModal(true)}>Open Modal with Portal</Button>

        <div className="mt-4 p-2 bg-muted rounded">
          <p className="text-sm">
            Without a portal, a modal inside this container would be clipped by the overflow property.
          </p>
        </div>
      </div>

      {showModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className="bg-background rounded-lg p-6 w-full max-w-md shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Modal with Portal</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <p>
                  This modal is rendered using <code>createPortal</code> directly to the document body. It escapes any
                  parent container constraints like overflow or z-index.
                </p>
                <p>
                  Even though the button is inside a container with <code>overflow: hidden</code>, this modal appears
                  above everything else.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setShowModal(false)}>Close Modal</Button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent
          component. This is perfect for modals, tooltips, and other overlays.
        </p>
      </div>
    </div>
  )
}

// 9. Error Boundaries Demo
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

function ErrorBoundaryDemo() {
  const [shouldError, setShouldError] = useState(false)

  const ErrorFallback = () => (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
      <h3 className="font-medium mb-2">Something went wrong</h3>
      <p className="mb-4">The component crashed due to an error.</p>
      <Button onClick={() => setShouldError(false)} variant="outline" size="sm">
        Reset
      </Button>
    </div>
  )

  const BuggyComponent = () => {
    if (shouldError) {
      throw new Error("This is a simulated error!")
    }

    return (
      <div className="p-4 border rounded-md">
        <h3 className="font-medium mb-2">Working Component</h3>
        <p>This component works fine until you click the button to trigger an error.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setShouldError(true)} disabled={shouldError}>
        Trigger Error
      </Button>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <BuggyComponent />
      </ErrorBoundary>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log
          those errors, and display a fallback UI instead of crashing the whole app.
        </p>
      </div>
    </div>
  )
}

// 10. forwardRef and useImperativeHandle Demo
function ForwardRefDemo() {
  const customInputRef = useRef<{ focus: () => void; reset: () => void }>(null)

  const handleFocus = () => {
    customInputRef.current?.focus()
  }

  const handleReset = () => {
    customInputRef.current?.reset()
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={handleFocus}>Focus Input</Button>
        <Button onClick={handleReset} variant="outline">
          Reset Input
        </Button>
      </div>

      <CustomInput ref={customInputRef} label="Forwarded Ref Input" />

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          forwardRef lets you forward refs to child components, while useImperativeHandle customizes the instance value
          that is exposed to parent components when using ref.
        </p>
      </div>
    </div>
  )
}

const CustomInput = forwardRef<{ focus: () => void; reset: () => void }, { label: string }>(function CustomInput(
  { label },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")

  // Expose only the methods we want to expose to the parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    reset: () => {
      setValue("")
      inputRef.current?.focus()
    },
  }))

  return (
    <div className="space-y-2">
      <Label htmlFor="custom-input">{label}</Label>
      <Input
        id="custom-input"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  )
})
