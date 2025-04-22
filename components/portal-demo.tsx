"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PortalDemo() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-4">
      <div className="overflow-hidden h-40 border rounded-md p-4 relative">
        <p className="mb-4">
          This container has <code>overflow: hidden</code> applied to it.
        </p>

        <Button onClick={() => setShowModal(true)}>Open Modal with Portal</Button>

        <div className="mt-4 p-2 bg-muted rounded">
          <p className="text-sm">
            Without a portal, a modal inside this container would be clipped by the overflow property.
          </p>
        </div>
      </div>

      {showModal && <ModalWithPortal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function ModalWithPortal({ onClose }: { onClose: () => void }) {
  // Only render on the client side where document is available
  if (typeof document === "undefined") return null

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Modal with Portal</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <p>
            This modal is rendered using <code>createPortal</code> directly to the document body. It escapes any parent
            container constraints like overflow or z-index.
          </p>
          <p>
            Even though the button is inside a container with <code>overflow: hidden</code>, this modal appears above
            everything else.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close Modal</Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
