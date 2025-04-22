"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

export default function TooltipDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <TooltipTrigger text="This tooltip uses createPortal">
        <div className="h-20 bg-primary/10 rounded flex items-center justify-center cursor-help">Hover me (Portal)</div>
      </TooltipTrigger>

      <div className="overflow-hidden h-20 border rounded relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <TooltipTrigger text="This tooltip can escape the container">
            <div className="h-12 w-40 bg-primary/10 rounded flex items-center justify-center cursor-help">
              Hover in container
            </div>
          </TooltipTrigger>
        </div>
      </div>

      <div className="h-20 bg-muted rounded flex items-center justify-center relative cursor-help">
        <div className="absolute inset-0 flex items-center justify-center">
          <RegularTooltip text="Regular tooltip (no portal)">
            <div className="h-12 w-40 bg-primary/10 rounded flex items-center justify-center cursor-help">
              Regular tooltip
            </div>
          </RegularTooltip>
        </div>
      </div>
    </div>
  )
}

function TooltipTrigger({ children, text }: { children: React.ReactNode; text: string }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showTooltip && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      })
    }
  }, [showTooltip])

  return (
    <div ref={triggerRef} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed bg-black text-white px-3 py-1.5 rounded text-sm z-50 transform -translate-x-1/2 -translate-y-full"
            style={{ left: position.x, top: position.y }}
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
          </div>,
          document.body,
        )}
    </div>
  )
}

function RegularTooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white px-3 py-1.5 rounded text-sm z-10">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
        </div>
      )}
    </div>
  )
}
