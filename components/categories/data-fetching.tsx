"use client"

import { useState, useEffect } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, RefreshCw } from "lucide-react"

export default function DataFetching() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Data Fetching & API</h2>
      <p className="text-muted-foreground mb-8">
        Techniques for fetching and managing data from APIs in React applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="51. Fetch API"
          description="Use the native Fetch API to make HTTP requests."
          level="beginner"
          docs="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
        >
          <FetchAPIDemo />
        </FeatureCard>

        <FeatureCard
          title="52. Axios"
          description="Use Axios for more powerful HTTP requests."
          level="intermediate"
          docs="https://axios-http.com/docs/intro"
        >
          <AxiosDemo />
        </FeatureCard>

        <FeatureCard
          title="53. React Query"
          description="Use React Query for data fetching, caching, and state management."
          level="advanced"
          docs="https://tanstack.com/query/latest"
        >
          <ReactQueryDemo />
        </FeatureCard>

        <FeatureCard
          title="54. SWR"
          description="Use SWR for data fetching with stale-while-revalidate caching."
          level="advanced"
          docs="https://swr.vercel.app/"
        >
          <SWRDemo />
        </FeatureCard>

        <FeatureCard
          title="55. Error Handling"
          description="Handle errors in data fetching operations."
          level="intermediate"
          docs="https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
        >
          <ErrorHandlingDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 51. Fetch API Demo
function FetchAPIDemo() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1")

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Basic Fetch Example</h3>
        <div className="flex gap-2">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="API URL" />
          <Button onClick={fetchData} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              "Fetch Data"
            )}
          </Button>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2">Response</h4>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : data ? (
            <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <div className="text-muted-foreground">No data fetched yet</div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such
          as requests and responses. It's built into modern browsers and provides a more powerful and flexible feature
          set than XMLHttpRequest.
        </p>
        <p className="mt-2">Key features include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Promise-based for easier async/await usage</li>
          <li>Streamlined API for modern web applications</li>
          <li>Support for CORS and other advanced HTTP features</li>
          <li>Built-in methods for handling JSON and other data formats</li>
        </ul>
      </div>
    </div>
  )
}

// 52. Axios Demo
function AxiosDemo() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("GET")
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1")

  // Simulated axios implementation (since we can't import it directly)
  const axios = {
    get: async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return { data: await response.json() }
    },
    post: async (url: string, data: any) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return { data: await response.json() }
    },
    put: async (url: string, data: any) => {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return { data: await response.json() }
    },
    delete: async (url: string) => {
      const response = await fetch(url, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return { data: await response.json() }
    },
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      let result
      switch (method) {
        case "GET":
          result = await axios.get(url)
          break
        case "POST":
          result = await axios.post(url, { title: "foo", body: "bar", userId: 1 })
          break
        case "PUT":
          result = await axios.put(url, { id: 1, title: "foo", body: "bar", userId: 1 })
          break
        case "DELETE":
          result = await axios.delete(url)
          break
      }
      setData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Axios Example (Simulated)</h3>
        <div className="flex gap-2">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={method}
            onChange={(e) => setMethod(e.target.value as "GET" | "POST" | "PUT" | "DELETE")}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="API URL" />
          <Button onClick={fetchData} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              "Send Request"
            )}
          </Button>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-2">Response</h4>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : data ? (
            <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <div className="text-muted-foreground">No data fetched yet</div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Axios is a popular HTTP client library for making requests from browsers and Node.js. It provides a more
          feature-rich alternative to the native Fetch API.
        </p>
        <p className="mt-2">Key features include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Automatic JSON data transformation</li>
          <li>Request and response interceptors</li>
          <li>Better error handling</li>
          <li>Client-side protection against XSRF</li>
          <li>Support for upload progress</li>
          <li>Cancellation of requests</li>
        </ul>
      </div>
    </div>
  )
}

// 53. React Query Demo
function ReactQueryDemo() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="basic">Basic Query</TabsTrigger>
          <TabsTrigger value="mutation">Mutations</TabsTrigger>
          <TabsTrigger value="pagination">Pagination</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">React Query Example (Simulated)</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This is a simulated example of how React Query would be used to fetch data from an API.
            </p>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// Using React Query to fetch data
import { useQuery } from '@tanstack/react-query'

function Posts() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://api.example.com/posts').then(res => res.json())
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Simulated Output</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-medium">Posts</h5>
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Refresh
                </Button>
              </div>
              <ul className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="p-2 bg-muted rounded-md text-sm">
                    Post {i + 1}: Lorem ipsum dolor sit amet
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mutation" className="space-y-4 pt-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">React Query Mutations (Simulated)</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This is a simulated example of how React Query would be used to create, update, or delete data.
            </p>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// Using React Query for mutations
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreatePost() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return fetch('https://api.example.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(res => res.json())
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({ title: 'New Post', body: 'Content...' })
      }}>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Simulated Output</h4>
            <div className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter post title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <textarea
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter post content"
                  />
                </div>
                <Button>Create Post</Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pagination" className="space-y-4 pt-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">React Query Pagination (Simulated)</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This is a simulated example of how React Query would be used to implement pagination.
            </p>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// Using React Query for pagination
import { useQuery } from '@tanstack/react-query'

function PaginatedPosts() {
  const [page, setPage] = useState(1)
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetch(\`https://api.example.com/posts?page=\${page}&limit=5\`)
      .then(res => res.json())
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <ul>
        {data.items.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      
      <div>
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(old => old + 1)} disabled={!data.hasMore}>
          Next
        </button>
      </div>
    </div>
  )
}`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Simulated Output</h4>
            <div className="space-y-4">
              <ul className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="p-2 bg-muted rounded-md text-sm">
                    Post {i + 1}: Lorem ipsum dolor sit amet
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <span className="text-sm">Page 1 of 5</span>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-muted-foreground">
        <p>
          React Query (now TanStack Query) is a powerful data fetching and state management library for React
          applications. It simplifies complex data fetching scenarios and provides a great developer experience.
        </p>
        <p className="mt-2">Key features include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Automatic caching and stale data management</li>
          <li>Background refetching and polling</li>
          <li>Pagination and infinite scrolling support</li>
          <li>Mutations with automatic cache updates</li>
          <li>Optimistic updates for better UX</li>
          <li>Prefetching for improved performance</li>
          <li>Devtools for debugging</li>
        </ul>
      </div>
    </div>
  )
}

// 54. SWR Demo
function SWRDemo() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="basic">Basic Usage</TabsTrigger>
          <TabsTrigger value="revalidation">Revalidation</TabsTrigger>
          <TabsTrigger value="mutation">Mutations</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">SWR Basic Usage (Simulated)</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This is a simulated example of how SWR would be used to fetch data from an API.
            </p>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// Using SWR to fetch data
import useSWR from 'swr'

// A simple fetcher function
const fetcher = (url) => fetch(url).then(res => res.json())

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Simulated Output</h4>
            <div className="p-4 bg-muted rounded-md">
              <h5 className="text-lg font-medium">John Doe</h5>
              <p className="text-sm mt-2">
                Software developer with a passion for building user-friendly applications. Experienced in React,
                Node.js, and TypeScript.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="revalidation" className="space-y-4 pt-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">SWR Revalidation (Simulated)</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This is a simulated example of how SWR handles revalidation strategies.
            </p>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// Using SWR with revalidation options
import useSWR from 'swr'

function Dashboard() {
  const { data, error, isLoading, mutate } = useSWR('/api/dashboard', fetcher, {
    // Revalidate on focus
    revalidateOnFocus: true,
    // Revalidate every 10 seconds
    refreshInterval: 10000,
    // Dedupe multiple requests
    dedupingInterval: 2000,
  })

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <button onClick={() => mutate()}>Refresh Data</button>
      <h2>Active Users: {data.activeUsers}</h2>
      <p>Last updated: {new Date(data.timestamp).toLocaleTimeString()}</p>
    </div>
  )
}`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Simulated Output</h4>
            <div className="space-y-4">
              <Button variant="outline" className="gap-1">
                <RefreshCw className="h-3 w-3" />
                Refresh Data
              </Button>
              <div className="p-4 bg-muted rounded-md">
                <h5 className="text-lg font-medium">Dashboard</h5>
                <p className="text-sm mt-2">Active Users: 1,234</p>
                <p className="text-xs text-muted-foreground mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
                <p className="text-xs text-muted-foreground mt-4">
                  Data will automatically refresh when you focus this tab or every 10 seconds
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mutation" className="space-y-4 pt-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">SWR Mutations (Simulated)</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This is a simulated example of how SWR handles local mutations.
            </p>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// Using SWR for mutations
import useSWR from 'swr'

function TodoList() {
  const { data, mutate } = useSWR('/api/todos', fetcher)

  async function toggleTodo(id, completed) {
    // Optimistically update the UI
    const optimisticData = data.map(todo => 
      todo.id === id ? { ...todo, completed } : todo
    )
    
    // Update the local data immediately, but keep the previous data
    mutate(optimisticData, { revalidate: false })
    
    // Send a request to update the data
    await fetch(\`/api/todos/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    })
    
    // Trigger a revalidation to make sure our local data is correct
    mutate()
  }

  return (
    <ul>
      {data?.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={e => toggleTodo(todo.id, e.target.checked)}
          />
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  )
}`}
            </pre>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Simulated Output</h4>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  <span className="text-sm">Todo item {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-muted-foreground">
        <p>
          SWR (stale-while-revalidate) is a React Hooks library for data fetching. The name comes from the HTTP cache
          invalidation strategy that first returns cached (stale) data, then sends a fetch request, and finally updates
          with fresh data.
        </p>
        <p className="mt-2">Key features include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Automatic revalidation on focus, network recovery, and interval</li>
          <li>Optimistic UI updates</li>
          <li>Fast page navigation with local cache</li>
          <li>Request deduplication</li>
          <li>Pagination and infinite scrolling support</li>
          <li>TypeScript ready</li>
        </ul>
      </div>
    </div>
  )
}

// 55. Error Handling Demo
function ErrorHandlingDemo() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1")
  const [errorType, setErrorType] = useState<"none" | "network" | "api" | "parsing">("none")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const fetchWithErrorHandling = async () => {
    setLoading(true)
    setData(null)
    setError(null)

    try {
      // Simulate different types of errors
      if (errorType === "network") {
        throw new Error("Network error: Failed to fetch data")
      }

      const response = await fetch(url)

      if (errorType === "api" || !response.ok) {
        throw new Response(JSON.stringify({ message: "API error: Server returned an error" }), {
          status: 500,
          statusText: "Internal Server Error",
        })
      }

      const result = await response.json()

      if (errorType === "parsing") {
        throw new SyntaxError("Parsing error: Invalid JSON")
      }

      setData(result)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (errorType === "none") {
      fetchWithErrorHandling()
    }
  }, [errorType])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Error Handling in Data Fetching</h3>
        <div className="flex gap-2">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="API URL" />
          <select
            className="flex h-10 w-full max-w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={errorType}
            onChange={(e) => setErrorType(e.target.value as "none" | "network" | "api" | "parsing")}
          >
            <option value="none">No Error</option>
            <option value="network">Network Error</option>
            <option value="api">API Error</option>
            <option value="parsing">Parsing Error</option>
          </select>
          <Button onClick={fetchWithErrorHandling} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              "Fetch Data"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Response</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : error ? (
                <div className="text-red-500">
                  <p className="font-medium">{error.name || "Error"}</p>
                  <p>{error.message || "An unknown error occurred"}</p>
                  {error.status && <p>Status: {error.status}</p>}
                </div>
              ) : data ? (
                <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
              ) : (
                <div className="text-muted-foreground">No data fetched yet</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Error Handling Code</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="text-xs p-4 overflow-auto">
                {`try {
  // Make the fetch request
  const response = await fetch(url)
  
  // Check if the response is ok (status 200-299)
  if (!response.ok) {
    throw new Error(\`HTTP error! Status: \${response.status}\`)
  }
  
  // Parse the JSON response
  const data = await response.json()
  
  // Use the data
  setData(data)
} catch (err) {
  // Handle different types of errors
  if (err instanceof TypeError) {
    // Network errors, CORS issues, etc.
    setError("Network error: " + err.message)
  } else if (err instanceof SyntaxError) {
    // JSON parsing errors
    setError("Parsing error: " + err.message)
  } else {
    // Other errors
    setError("Error: " + err.message)
  }
} finally {
  // Code that runs regardless of success or failure
  setLoading(false)
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Proper error handling is crucial for creating robust applications. When fetching data, various types of errors
          can occur:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <span className="font-medium">Network errors:</span> Failed connections, CORS issues, timeouts
          </li>
          <li>
            <span className="font-medium">API errors:</span> 4xx and 5xx status codes, invalid endpoints
          </li>
          <li>
            <span className="font-medium">Parsing errors:</span> Invalid JSON, unexpected data formats
          </li>
          <li>
            <span className="font-medium">Logic errors:</span> Unexpected data structures, missing fields
          </li>
        </ul>
        <p className="mt-2">
          Best practices include using try/catch blocks, checking response.ok, providing fallback UI, and implementing
          retry mechanisms for transient errors.
        </p>
      </div>
    </div>
  )
}
