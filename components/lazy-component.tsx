"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LazyComponent() {
  const [data, setData] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setData(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"])
    setLoading(false)
  }

  useEffect(() => {
    // Simulate initial data loading
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lazy Loaded Component</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            This component was loaded lazily with React.lazy and Suspense. The initial loading state was handled by the
            Suspense fallback.
          </p>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Data:</h3>
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {data.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <Button onClick={fetchData} disabled={loading}>
            {loading ? "Loading..." : "Reload Data"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
