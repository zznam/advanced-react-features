"use client"

import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Package, GitBranch, Users } from "lucide-react"

// Micro Frontend Demo Component
function MicroFrontendDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Micro Frontend A</h4>
        <p className="text-sm text-muted-foreground mb-4">
          This component simulates a micro frontend with its own state.
        </p>
        <div className="flex items-center gap-4">
          <button
            className="px-3 py-1 border rounded-md"
            onClick={() => setCount((c) => c - 1)}
          >
            -
          </button>
          <span className="text-lg font-medium">{count}</span>
          <button
            className="px-3 py-1 border rounded-md"
            onClick={() => setCount((c) => c + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="font-medium mb-2">Module Federation Example</h4>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
          {`// webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Counter': './src/components/Counter',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
};`}
        </pre>
      </div>
    </div>
  )
}

export default function MicroFrontends() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Micro Frontends</h2>
      <p className="text-muted-foreground mb-8">
        Architecture for building scalable frontend applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="Module Federation"
          description="Share code between applications using Webpack's Module Federation."
          level="advanced"
          docs="https://webpack.js.org/concepts/module-federation/"
        >
          <MicroFrontendDemo />
        </FeatureCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Independent Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Deploy features independently</li>
                <li>• Rollback specific features</li>
                <li>• A/B testing capabilities</li>
                <li>• Gradual rollout</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Framework agnostic</li>
                <li>• Mix and match technologies</li>
                <li>• Upgrade independently</li>
                <li>• Experiment with new tech</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team Organization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Autonomous teams</li>
                <li>• Clear ownership</li>
                <li>• Parallel development</li>
                <li>• Reduced conflicts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 