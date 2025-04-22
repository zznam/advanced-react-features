"use client"

import type React from "react"
import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { X, Info, Menu, ChevronDown, Search, Check, Plus } from "lucide-react"

export default function UIPatterns() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">UI Patterns & Components</h2>
      <p className="text-muted-foreground mb-8">
        Explore common UI patterns and components in React applications
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">Basic Accordion</h3>
          <div className="border rounded-md divide-y">
            <div>
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                onClick={() => toggleItem("item1")}
              >
                <span>Section 1</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openItems.includes("item1") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems.includes("item1") && (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  Content for section 1
                </div>
              )}
            </div>
            <div>
              <button
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                onClick={() => toggleItem("item2")}
              >
                <span>Section 2</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openItems.includes("item2") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems.includes("item2") && (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  Content for section 2
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Modal Dialog</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modal Dialog</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>This is a modal dialog example.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Tooltip</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Popover</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>This is a popover content</p>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Drawer</h3>
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <p>This is a drawer content</p>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
