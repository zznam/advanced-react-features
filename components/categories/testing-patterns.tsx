"use client"

import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

// Component to be tested
function Counter({ initialValue = 0 }: { initialValue?: number }) {
  const [count, setCount] = useState(initialValue)

  return (
    <div className="space-y-4">
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
  )
}

// Test Examples
function TestExamples() {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Component Testing</h4>
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

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Integration Testing</h4>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          {`// UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from './UserProfile'
import { UserProvider } from './UserContext'

test('UserProfile integration', async () => {
  render(
    <UserProvider>
      <UserProfile />
    </UserProvider>
  )
  
  // Loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  
  // Wait for data
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
  
  // Check profile data
  expect(screen.getByText('john@example.com')).toBeInTheDocument()
})`}
        </pre>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Performance Testing</h4>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          {`// Performance.test.tsx
import { render } from '@testing-library/react'
import { measurePerformance } from '@testing-library/react-hooks'
import HeavyComponent from './HeavyComponent'

test('HeavyComponent performance', async () => {
  const { renderTime } = await measurePerformance(() => {
    render(<HeavyComponent />)
  })
  
  expect(renderTime).toBeLessThan(100) // ms
})`}
        </pre>
      </div>
    </div>
  )
}

// Live Demo
function TestingDemo() {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Component Under Test</h4>
        <Counter initialValue={0} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Unit Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Component rendering</li>
              <li>• State management</li>
              <li>• Event handling</li>
              <li>• Props validation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Integration Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Component interaction</li>
              <li>• Context usage</li>
              <li>• API integration</li>
              <li>• Data flow</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              Performance Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Render time</li>
              <li>• Memory usage</li>
              <li>• CPU utilization</li>
              <li>• Bundle size</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function TestingPatterns() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Testing Patterns</h2>
      <p className="text-muted-foreground mb-8">
        Advanced testing strategies for React applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="Testing Patterns"
          description="Advanced testing strategies for React applications."
          level="advanced"
          docs="https://reactjs.org/docs/testing.html"
        >
          <TestingDemo />
        </FeatureCard>

        <FeatureCard
          title="Test Examples"
          description="Example test implementations for different testing scenarios."
          level="advanced"
          docs="https://testing-library.com/docs/react-testing-library/intro/"
        >
          <TestExamples />
        </FeatureCard>
      </div>
    </div>
  )
} 