"use client"

import type React from "react"

import { useState } from "react"
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, RefreshCw, Trash2 } from "lucide-react"

// Create a client
const queryClient = new QueryClient()

// Mock API functions
const fetchTodos = async (): Promise<Todo[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return JSON.parse(localStorage.getItem("todos") || "[]")
}

const addTodo = async (text: string): Promise<Todo> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  const todos = JSON.parse(localStorage.getItem("todos") || "[]")
  const newTodo = { id: Date.now(), text, completed: false }
  localStorage.setItem("todos", JSON.stringify([...todos, newTodo]))
  return newTodo
}

const toggleTodo = async (id: number): Promise<Todo> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  const todos = JSON.parse(localStorage.getItem("todos") || "[]")
  const updatedTodos = todos.map((todo: Todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  localStorage.setItem("todos", JSON.stringify(updatedTodos))
  return updatedTodos.find((todo: Todo) => todo.id === id)
}

const deleteTodo = async (id: number): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  const todos = JSON.parse(localStorage.getItem("todos") || "[]")
  const updatedTodos = todos.filter((todo: Todo) => todo.id !== id)
  localStorage.setItem("todos", JSON.stringify(updatedTodos))
}

// Types
type Todo = {
  id: number
  text: string
  completed: boolean
}

// TodoApp component
function TodoApp() {
  const [newTodo, setNewTodo] = useState("")
  const queryClient = useQueryClient()

  // Queries
  const {
    data: todos = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  })

  // Mutations
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      setNewTodo("")
    },
  })

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addMutation.mutate(newTodo)
    }
  }

  if (isError) {
    return <div>Error loading todos</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Todo List with React Query</h3>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <form onSubmit={handleAddTodo} className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          disabled={addMutation.isPending}
        />
        <Button type="submit" disabled={addMutation.isPending || !newTodo.trim()}>
          {addMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Todo"
          )}
        </Button>
      </form>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No todos yet. Add one above!</div>
        ) : (
          todos.map((todo: Todo) => (
            <div key={todo.id} className="flex items-center justify-between p-3 border rounded-md bg-card">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleMutation.mutate(todo.id)}
                  disabled={toggleMutation.isPending}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.text}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMutation.mutate(todo.id)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="bg-muted p-4 rounded-md mt-6">
        <h4 className="font-medium mb-2">React Query Features Demonstrated:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Data fetching with useQuery</li>
          <li>Mutations with useMutation</li>
          <li>Cache invalidation</li>
          <li>Loading and error states</li>
          <li>Optimistic updates</li>
        </ul>
      </div>
    </div>
  )
}

// Wrap the app with QueryClientProvider
export default function ReactQueryDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  )
}
