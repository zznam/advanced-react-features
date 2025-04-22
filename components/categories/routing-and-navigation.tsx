"use client"

import type React from "react"

import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, ChevronRight } from "lucide-react"

export default function RoutingAndNavigation() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Routing & Navigation</h2>
      <p className="text-muted-foreground mb-8">
        Techniques for implementing routing and navigation in React applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="56. Next.js App Router"
          description="Use Next.js App Router for file-based routing."
          level="intermediate"
          docs="https://nextjs.org/docs/app/building-your-application/routing"
        >
          <NextjsAppRouterDemo />
        </FeatureCard>

        <FeatureCard
          title="57. Dynamic Routes"
          description="Create dynamic routes with parameters."
          level="intermediate"
          docs="https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes"
        >
          <DynamicRoutesDemo />
        </FeatureCard>

        <FeatureCard
          title="58. Nested Layouts"
          description="Create nested layouts for different sections of your application."
          level="intermediate"
          docs="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts"
        >
          <NestedLayoutsDemo />
        </FeatureCard>

        <FeatureCard
          title="59. Navigation and Links"
          description="Navigate between pages using links and programmatic navigation."
          level="beginner"
          docs="https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating"
        >
          <NavigationAndLinksDemo />
        </FeatureCard>

        <FeatureCard
          title="60. Route Handlers"
          description="Create API endpoints with route handlers."
          level="intermediate"
          docs="https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
        >
          <RouteHandlersDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 56. Next.js App Router Demo
function NextjsAppRouterDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">App Router File Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">File-based Routing</h4>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`app/
├── layout.tsx      # Root layout (applied to all routes)
├── page.tsx        # Home page (/)
├── about/
│   └── page.tsx    # About page (/about)
├── blog/
│   ├── layout.tsx  # Blog layout
│   ├── page.tsx    # Blog index page (/blog)
│   └── [slug]/     # Dynamic route
│       └── page.tsx # Blog post page (/blog/post-1)
└── api/
    └── route.ts    # API route (/api)`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Special Files</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">page.tsx</span> - UI for a route
              </li>
              <li>
                <span className="font-medium">layout.tsx</span> - Shared UI for a segment and its children
              </li>
              <li>
                <span className="font-medium">loading.tsx</span> - Loading UI for a segment
              </li>
              <li>
                <span className="font-medium">error.tsx</span> - Error UI for a segment
              </li>
              <li>
                <span className="font-medium">not-found.tsx</span> - Not found UI
              </li>
              <li>
                <span className="font-medium">route.ts</span> - API endpoint
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Basic Page Component</h3>
        <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
          {`// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to my website</h1>
      <p>This is the home page of my Next.js application.</p>
    </main>
  )
}`}
        </pre>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Next.js App Router is a file-based routing system that uses the file system to define routes. Each folder
          represents a route segment, and the hierarchy of folders represents the route hierarchy.
        </p>
        <p className="mt-2">Key features include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Server Components by default</li>
          <li>Nested layouts and co-location</li>
          <li>Loading and error states</li>
          <li>Server-side rendering and static generation</li>
          <li>API routes with route handlers</li>
          <li>Middleware support</li>
        </ul>
      </div>
    </div>
  )
}

// 57. Dynamic Routes Demo
function DynamicRoutesDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Dynamic Route Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Single Dynamic Segment</h4>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`app/
└── blog/
    └── [slug]/
        └── page.tsx    # Matches /blog/post-1, /blog/hello-world`}
            </pre>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Accessing the parameter:</p>
              <pre className="text-xs bg-muted p-2 rounded-md mt-1 overflow-auto">
                {`// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: {
  params: { slug: string }
}) {
  return <h1>Post: {params.slug}</h1>
}`}
              </pre>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Catch-all Segments</h4>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`app/
└── shop/
    └── [...categories]/
        └── page.tsx    # Matches /shop/clothes, /shop/clothes/shirts/blue`}
            </pre>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Accessing the parameters:</p>
              <pre className="text-xs bg-muted p-2 rounded-md mt-1 overflow-auto">
                {`// app/shop/[...categories]/page.tsx
export default function Category({ params }: {
  params: { categories: string[] }
}) {
  return (
    <h1>Categories: {params.categories.join(', ')}</h1>
  )
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Optional Catch-all Segments</h3>
        <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
          {`app/
└── docs/
    └── [[...slug]]/
        └── page.tsx    # Matches /docs, /docs/intro, /docs/advanced/routing`}
        </pre>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">Accessing the parameters:</p>
          <pre className="text-sm bg-muted p-2 rounded-md mt-1 overflow-auto">
            {`// app/docs/[[...slug]]/page.tsx
export default function Docs({ params }: {
  params: { slug?: string[] }
}) {
  if (!params.slug) {
    return <h1>Docs Home Page</h1>
  }
  
  return (
    <h1>Docs: {params.slug.join(' > ')}</h1>
  )
}`}
          </pre>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Dynamic routes in Next.js allow you to create pages that can match different URL patterns and capture values
          from the URL.
        </p>
        <p className="mt-2">There are three types of dynamic segments:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>
            <span className="font-medium">[id]</span> - Single dynamic segment (matches a single segment in the URL)
          </li>
          <li>
            <span className="font-medium">[...slug]</span> - Catch-all segment (matches multiple segments in the URL)
          </li>
          <li>
            <span className="font-medium">[[...slug]]</span> - Optional catch-all segment (matches zero or more
            segments)
          </li>
        </ul>
      </div>
    </div>
  )
}

// 58. Nested Layouts Demo
function NestedLayoutsDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Nested Layouts Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">File Structure</h4>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`app/
├── layout.tsx        # Root layout (applied to all routes)
├── page.tsx          # Home page
└── dashboard/
    ├── layout.tsx    # Dashboard layout
    ├── page.tsx      # Dashboard index page
    ├── settings/
    │   ├── layout.tsx # Settings layout
    │   └── page.tsx   # Settings page
    └── analytics/
        └── page.tsx   # Analytics page`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Layout Nesting</h4>
            <div className="border-2 border-dashed border-gray-300 p-3 rounded-md">
              <div className="text-xs">Root Layout</div>
              <div className="border-2 border-dashed border-gray-300 p-3 rounded-md mt-2">
                <div className="text-xs">Dashboard Layout</div>
                <div className="border-2 border-dashed border-gray-300 p-3 rounded-md mt-2">
                  <div className="text-xs">Settings Layout</div>
                  <div className="border-2 border-dashed border-gray-300 p-3 rounded-md mt-2">
                    <div className="text-xs">Page Content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Layout Implementation</h3>
        <Tabs defaultValue="root">
          <TabsList>
            <TabsTrigger value="root">Root Layout</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard Layout</TabsTrigger>
            <TabsTrigger value="settings">Settings Layout</TabsTrigger>
          </TabsList>
          <TabsContent value="root" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-primary text-white p-4">
          <h1>My Application</h1>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 text-center">
          <p>© 2023 My Application</p>
        </footer>
      </body>
    </html>
  )
}`}
            </pre>
          </TabsContent>
          <TabsContent value="dashboard" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4 min-h-screen">
        <nav>
          <ul className="space-y-2">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/dashboard/analytics">Analytics</a></li>
            <li><a href="/dashboard/settings">Settings</a></li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  )
}`}
            </pre>
          </TabsContent>
          <TabsContent value="settings" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// app/dashboard/settings/layout.tsx
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex gap-4">
        <aside className="w-48">
          <nav>
            <ul className="space-y-1">
              <li><a href="/dashboard/settings/profile">Profile</a></li>
              <li><a href="/dashboard/settings/account">Account</a></li>
              <li><a href="/dashboard/settings/notifications">Notifications</a></li>
            </ul>
          </nav>
        </aside>
        <div className="flex-1 border rounded-md p-4">
          {children}
        </div>
      </div>
    </div>
  )
}`}
            </pre>
          </TabsContent>
        </Tabs>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Nested layouts in Next.js allow you to create UI that is shared across multiple pages. Each layout wraps the
          content of its children, allowing for nested UI structures.
        </p>
        <p className="mt-2">Key benefits include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Shared UI elements without re-rendering</li>
          <li>Preserved state across page navigations</li>
          <li>Organized code structure</li>
          <li>Improved performance through partial rendering</li>
          <li>Nested layouts for complex UI hierarchies</li>
        </ul>
      </div>
    </div>
  )
}

// 59. Navigation and Links Demo
function NavigationAndLinksDemo() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")

  const simulateNavigation = (page: string) => {
    setIsNavigating(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsNavigating(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Link Component</h3>
        <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
          {`// Using the Link component for client-side navigation
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link 
            href="/contact" 
            className="text-blue-500 hover:underline"
            prefetch={false} // Disable prefetching
          >
            Contact
          </Link>
        </li>
        <li>
          <Link 
            href={{
              pathname: '/blog/[slug]',
              query: { slug: 'hello-world' },
            }}
          >
            Hello World Post
          </Link>
        </li>
      </ul>
    </nav>
  )
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Programmatic Navigation</h3>
        <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
          {`// Using the useRouter hook for programmatic navigation
'use client'

import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Perform login logic
    const success = await login(/* credentials */)
    
    if (success) {
      // Navigate to dashboard after successful login
      router.push('/dashboard')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Log in</button>
      <button type="button" onClick={() => router.back()}>
        Go Back
      </button>
      <button type="button" onClick={() => router.refresh()}>
        Refresh
      </button>
    </form>
  )
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Navigation Demo</h3>
        <div className="border rounded-md p-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={currentPage === "home" ? "default" : "outline"}
              onClick={() => simulateNavigation("home")}
              disabled={isNavigating}
            >
              Home
            </Button>
            <Button
              variant={currentPage === "about" ? "default" : "outline"}
              onClick={() => simulateNavigation("about")}
              disabled={isNavigating}
            >
              About
            </Button>
            <Button
              variant={currentPage === "blog" ? "default" : "outline"}
              onClick={() => simulateNavigation("blog")}
              disabled={isNavigating}
            >
              Blog
            </Button>
            <Button
              variant={currentPage === "contact" ? "default" : "outline"}
              onClick={() => simulateNavigation("contact")}
              disabled={isNavigating}
            >
              Contact
            </Button>
          </div>

          {isNavigating ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Navigating...</span>
            </div>
          ) : (
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page</h4>
              <p>This is the {currentPage} page content.</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Next.js provides two main ways to navigate between pages:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <span className="font-medium">Link Component:</span> For declarative navigation with automatic prefetching
          </li>
          <li>
            <span className="font-medium">useRouter Hook:</span> For programmatic navigation in response to user actions
          </li>
        </ul>
        <p className="mt-2">Key features include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Automatic code-splitting and prefetching</li>
          <li>Client-side navigation without full page reloads</li>
          <li>Preserved scroll position</li>
          <li>Back/forward navigation support</li>
          <li>Shallow routing for URL changes without data refetching</li>
        </ul>
      </div>
    </div>
  )
}

// 60. Route Handlers Demo
function RouteHandlersDemo() {
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("GET")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)

  const simulateRequest = () => {
    setLoading(true)
    setTimeout(() => {
      switch (method) {
        case "GET":
          setResponse({
            status: 200,
            data: [
              { id: 1, name: "Product 1" },
              { id: 2, name: "Product 2" },
              { id: 3, name: "Product 3" },
            ],
          })
          break
        case "POST":
          setResponse({
            status: 201,
            data: { id: 4, name: "Product 4" },
            message: "Product created successfully",
          })
          break
        case "PUT":
          setResponse({
            status: 200,
            data: { id: 1, name: "Updated Product 1" },
            message: "Product updated successfully",
          })
          break
        case "DELETE":
          setResponse({
            status: 200,
            message: "Product deleted successfully",
          })
          break
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Route Handler Examples</h3>
        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Basic Handler</TabsTrigger>
            <TabsTrigger value="dynamic">Dynamic Route</TabsTrigger>
            <TabsTrigger value="methods">HTTP Methods</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello, world!' })
}`}
            </pre>
          </TabsContent>
          <TabsContent value="dynamic" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// app/api/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  // Fetch product from database
  const product = await db.products.findUnique({
    where: { id },
  })
  
  if (!product) {
    return Response.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  
  return Response.json(product)
}`}
            </pre>
          </TabsContent>
          <TabsContent value="methods" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// app/api/products/route.ts
export async function GET() {
  // Get all products
  const products = await db.products.findMany()
  return Response.json(products)
}

export async function POST(request: Request) {
  // Create a new product
  const data = await request.json()
  
  // Validate data
  if (!data.name) {
    return Response.json(
      { error: 'Name is required' },
      { status: 400 }
    )
  }
  
  // Save to database
  const product = await db.products.create({
    data,
  })
  
  return Response.json(product, { status: 201 })
}

// You can also export DELETE, PUT, PATCH, etc.`}
            </pre>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Route Handler Demo</h3>
        <div className="border rounded-md p-4">
          <div className="flex gap-2 mb-4">
            <select
              className="flex h-10 w-full max-w-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={method}
              onChange={(e) => setMethod(e.target.value as "GET" | "POST" | "PUT" | "DELETE")}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <Input defaultValue="/api/products" disabled className="flex-1" />
            <Button onClick={simulateRequest} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Request"
              )}
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Response</h4>
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Loading...</span>
              </div>
            ) : response ? (
              <pre className="text-sm overflow-auto">{JSON.stringify(response, null, 2)}</pre>
            ) : (
              <p className="text-sm text-muted-foreground">Send a request to see the response</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Route Handlers in Next.js allow you to create API endpoints within your application. They are defined in a
          route.ts or route.js file and export functions corresponding to HTTP methods.
        </p>
        <p className="mt-2">Key features include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Support for all HTTP methods (GET, POST, PUT, DELETE, etc.)</li>
          <li>Built on the Web Request and Response APIs</li>
          <li>Streaming responses</li>
          <li>Form and file handling</li>
          <li>CORS and middleware support</li>
          <li>TypeScript integration</li>
        </ul>
      </div>
    </div>
  )
}

interface ActionProps {
  name: string
  description: string
}

function Action({ name, description }: ActionProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Button>
        View <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

interface ActionsProps {
  children: React.ReactNode
}

function Actions({ children }: ActionsProps) {
  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold">Further Actions</h2>
      {children}
    </div>
  )
}
;<Actions>
  <Action
    name="Create React Server Components example"
    description="Add a demonstration of React Server Components and their benefits"
  />
  <Action
    name="Add WebSocket integration"
    description="Create a real-time chat or notification system using WebSockets"
  />
  <Action
    name="Add Intersection Observer demo"
    description="Enhance the existing demo with more advanced Intersection Observer use cases"
  />
  <Action
    name="Add accessibility examples"
    description="Create comprehensive accessibility examples for React components"
  />
  <Action
    name="Add testing and debugging section"
    description="Create examples for testing React components and debugging techniques"
  />
</Actions>
