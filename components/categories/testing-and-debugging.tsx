"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code } from "@/components/ui/code"
import FeatureCard from "../feature-card"

export default function TestingAndDebugging() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Testing & Debugging</h2>
        <p className="text-muted-foreground mt-2">Tools and techniques for testing and debugging React applications</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="React Testing Library"
          description="Testing utilities that encourage good testing practices"
          level="Intermediate"
        >
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code">Code Example</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <p>
                React Testing Library is a lightweight solution for testing React components. It provides utility
                functions on top of react-dom and react-dom/test-utils, encouraging better testing practices by focusing
                on testing components from the user's perspective.
              </p>
              <div>
                <Badge variant="outline" className="mr-2">
                  Testing
                </Badge>
                <Badge variant="outline" className="mr-2">
                  User-centric
                </Badge>
                <Badge variant="outline">Accessibility</Badge>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Code language="tsx">{`
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick when button is clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  fireEvent.click(screen.getByText('Click Me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('renders with correct text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
              `}</Code>
            </TabsContent>
          </Tabs>
        </FeatureCard>

        <FeatureCard
          title="Jest"
          description="JavaScript testing framework with a focus on simplicity"
          level="Intermediate"
        >
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code">Code Example</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <p>
                Jest is a delightful JavaScript testing framework with a focus on simplicity. It works with projects
                using Babel, TypeScript, Node, React, Angular, Vue, and more. Jest provides a complete and
                easy-to-set-up testing solution.
              </p>
              <div>
                <Badge variant="outline" className="mr-2">
                  Testing
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Mocking
                </Badge>
                <Badge variant="outline">Snapshot Testing</Badge>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Code language="tsx">{`
// sum.js
export function sum(a, b) {
  return a + b;
}

// sum.test.js
import { sum } from './sum';

describe('sum function', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('handles negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  it('handles zero', () => {
    expect(sum(0, 0)).toBe(0);
  });
});
              `}</Code>
            </TabsContent>
          </Tabs>
        </FeatureCard>

        <FeatureCard
          title="React DevTools"
          description="Browser extension for inspecting and debugging React components"
          level="Beginner"
        >
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code">Usage</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <p>
                React DevTools is a browser extension that allows you to inspect the React component hierarchy, view
                component props and state, and track component renders. It's an essential tool for debugging React
                applications.
              </p>
              <div>
                <Badge variant="outline" className="mr-2">
                  Debugging
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Performance
                </Badge>
                <Badge variant="outline">Development</Badge>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Code language="markdown">{`
# Using React DevTools

1. Install the extension for Chrome or Firefox
2. Open your React app in the browser
3. Open DevTools (F12 or Ctrl+Shift+I)
4. Navigate to the "Components" or "Profiler" tab

## Key Features:
- Inspect component hierarchy
- View and edit props and state
- Track component renders
- Measure performance with the Profiler
- Filter components by name
- Highlight components when hovering over DOM elements
              `}</Code>
            </TabsContent>
          </Tabs>
        </FeatureCard>

        <FeatureCard
          title="Error Boundaries"
          description="React components that catch JavaScript errors in child components"
          level="Intermediate"
        >
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code">Code Example</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <p>
                Error Boundaries are React components that catch JavaScript errors anywhere in their child component
                tree, log those errors, and display a fallback UI instead of crashing the component tree.
              </p>
              <div>
                <Badge variant="outline" className="mr-2">
                  Error Handling
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Resilience
                </Badge>
                <Badge variant="outline">User Experience</Badge>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Code language="tsx">{`
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
              `}</Code>
            </TabsContent>
          </Tabs>
        </FeatureCard>

        <FeatureCard title="Cypress" description="End-to-end testing framework for web applications" level="Advanced">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code">Code Example</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <p>
                Cypress is a next-generation front-end testing tool built for the modern web. It enables you to write
                faster, easier, and more reliable tests for anything that runs in a browser.
              </p>
              <div>
                <Badge variant="outline" className="mr-2">
                  E2E Testing
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Integration
                </Badge>
                <Badge variant="outline">Visual Testing</Badge>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <Code language="javascript">{`
// cypress/integration/login.spec.js
describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Assert that user is redirected to dashboard
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Welcome');
  });
});
              `}</Code>
            </TabsContent>
          </Tabs>
        </FeatureCard>
      </div>
    </div>
  )
}
