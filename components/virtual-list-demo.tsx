"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

// Generate a large dataset
const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    text: `Item ${index + 1}`,
    height: Math.floor(Math.random() * 50) + 50, // Random height between 50-100px
  }))
}

export default function VirtualListDemo() {
  return (
    <Tabs defaultValue="fixed">
      <TabsList className="mb-4">
        <TabsTrigger value="fixed">Fixed Height</TabsTrigger>
        <TabsTrigger value="variable">Variable Height</TabsTrigger>
      </TabsList>

      <TabsContent value="fixed" className="mt-0">
        <FixedHeightVirtualList />
      </TabsContent>

      <TabsContent value="variable" className="mt-0">
        <VariableHeightVirtualList />
      </TabsContent>
    </Tabs>
  )
}

function FixedHeightVirtualList() {
  const [items, setItems] = useState(() => generateItems(10000))
  const [itemCount, setItemCount] = useState(10000)
  const [scrollTop, setScrollTop] = useState(0)
  const [filter, setFilter] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)

  // Constants for virtualization
  const itemHeight = 40
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

  const regenerateItems = () => {
    setItems(generateItems(itemCount))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Label htmlFor="filter">Filter Items</Label>
          <Input
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Type to filter..."
            className="mt-1"
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="item-count">Item Count: {itemCount.toLocaleString()}</Label>
          <div className="flex gap-2 items-center mt-1">
            <Slider
              id="item-count"
              min={100}
              max={100000}
              step={100}
              value={[itemCount]}
              onValueChange={(value) => setItemCount(value[0])}
            />
            <Button onClick={regenerateItems} size="sm">
              Generate
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fixed Height Virtual List</CardTitle>
        </CardHeader>
        <CardContent>
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
                  className="border-b p-2 flex items-center absolute w-full"
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

          <div className="mt-4 text-sm text-muted-foreground">
            Rendering {visibleItems.length} of {filteredItems.length} items
            {filter && ` (filtered from ${items.length})`}
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Fixed Height Virtualization:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Efficiently renders thousands of items with constant height</li>
          <li>Only renders items visible in the viewport (plus overscan)</li>
          <li>Maintains scroll position and total scroll height</li>
          <li>Supports filtering while maintaining virtualization</li>
        </ul>
      </div>
    </div>
  )
}

function VariableHeightVirtualList() {
  const [items] = useState(() => generateItems(5000))
  const [scrollTop, setScrollTop] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  // Constants for virtualization
  const containerHeight = 400
  const overscan = 5

  // Calculate item positions and total height
  const itemPositions = items.reduce<number[]>((acc, item, index) => {
    const prevPos = index > 0 ? acc[index - 1] : 0
    const prevHeight = index > 0 ? items[index - 1].height : 0
    acc.push(prevPos + prevHeight)
    return acc
  }, [])

  const totalHeight = itemPositions[itemPositions.length - 1] + items[items.length - 1].height

  // Find visible range using binary search
  const findItemIndexAtPosition = (position: number) => {
    let low = 0
    let high = itemPositions.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (itemPositions[mid] <= position && (mid === itemPositions.length - 1 || itemPositions[mid + 1] > position)) {
        return mid
      } else if (itemPositions[mid] > position) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return 0
  }

  const startIndex = Math.max(0, findItemIndexAtPosition(scrollTop) - overscan)
  const endIndex = Math.min(items.length - 1, findItemIndexAtPosition(scrollTop + containerHeight) + overscan)

  const visibleItems = items.slice(startIndex, endIndex + 1)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Variable Height Virtual List</CardTitle>
        </CardHeader>
        <CardContent>
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
                  className="border-b p-2 absolute w-full"
                  style={{
                    height: item.height,
                    top: itemPositions[startIndex + visibleItems.indexOf(item)],
                    display: "flex",
                    alignItems: "center",
                    background: item.height > 75 ? "rgba(var(--primary), 0.1)" : undefined,
                  }}
                >
                  <div className="flex justify-between w-full">
                    <span>{item.text}</span>
                    <span className="text-xs text-muted-foreground">Height: {item.height}px</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Rendering {visibleItems.length} of {items.length} items with variable heights
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Variable Height Virtualization:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Handles items with different heights efficiently</li>
          <li>Uses binary search to find visible items</li>
          <li>Pre-calculates item positions for performance</li>
          <li>Maintains correct scroll position and total height</li>
          <li>Items with height &gt; 75px are highlighted with a subtle background</li>
        </ul>
      </div>
    </div>
  )
}
