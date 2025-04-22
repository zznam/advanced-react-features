"use client"

import type React from "react"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import { useState } from "react"

// Define the counter store
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementBy: (value: number) => void
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (value) => set((state) => ({ count: state.count + value })),
}))

// Define the todo store with persistence
interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
  clearCompleted: () => void
}

const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text,
              completed: false,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: "todo-storage",
    },
  ),
)

// Define the shopping cart store
interface Product {
  id: number
  name: string
  price: number
}

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }

      return {
        items: [...state.items, { product, quantity: 1 }],
      }
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.product.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
  totalPrice: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  },
}))

export default function StateManagementDemo() {
  return (
    <Tabs defaultValue="counter">
      <TabsList className="mb-4">
        <TabsTrigger value="counter">Counter</TabsTrigger>
        <TabsTrigger value="todo">Todo List</TabsTrigger>
        <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
      </TabsList>

      <TabsContent value="counter" className="mt-0">
        <CounterDemo />
      </TabsContent>

      <TabsContent value="todo" className="mt-0">
        <TodoDemo />
      </TabsContent>

      <TabsContent value="cart" className="mt-0">
        <CartDemo />
      </TabsContent>
    </Tabs>
  )
}

function CounterDemo() {
  const { count, increment, decrement, reset, incrementBy } = useCounterStore()
  const [incrementValue, setIncrementValue] = useState(5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Counter with Zustand</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="text-6xl font-bold mb-6">{count}</div>
          <div className="flex gap-2">
            <Button onClick={decrement} variant="outline" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
            <Button onClick={increment} variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex gap-2 items-center">
            <Input
              type="number"
              value={incrementValue}
              onChange={(e) => setIncrementValue(Number.parseInt(e.target.value) || 0)}
              className="w-20"
            />
            <Button onClick={() => incrementBy(incrementValue)}>Add</Button>
          </div>
          <Button onClick={reset} variant="outline" className="mt-4">
            Reset
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Counter Consumer Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CounterDisplay />
            <CounterControls />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Separate components that consume the counter store
function CounterDisplay() {
  const count = useCounterStore((state) => state.count)

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">Display Component</h3>
      <p>
        Current count: <span className="font-bold text-xl">{count}</span>
      </p>
      <p className="text-sm text-muted-foreground mt-2">This component only subscribes to the count value</p>
    </div>
  )
}

function CounterControls() {
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">Controls Component</h3>
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

function TodoDemo() {
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodoStore()
  const [newTodo, setNewTodo] = useState("")

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo)
      setNewTodo("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Todo List with Persistence</span>
          <Badge variant="outline">{todos.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
          <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" />
          <Button type="submit">Add</Button>
        </form>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No todos yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.text}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
      {todos.length > 0 && (
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {todos.filter((todo) => todo.completed).length} of {todos.length} completed
          </div>
          <Button variant="outline" size="sm" onClick={clearCompleted}>
            Clear Completed
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

function CartDemo() {
  // Sample products
  const products = [
    { id: 1, name: "Mechanical Keyboard", price: 149.99 },
    { id: 2, name: "Wireless Mouse", price: 59.99 },
    { id: 3, name: '27" Monitor', price: 299.99 },
    { id: 4, name: "Noise-Cancelling Headphones", price: 199.99 },
  ]

  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-md p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
                  <Button onClick={() => addItem(product)} className="w-full mt-3" size="sm">
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Shopping Cart</span>
              <Badge variant="secondary" className="flex gap-1 items-center">
                <ShoppingCart className="h-3 w-3" />
                {totalItems()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          {items.length > 0 && (
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
