"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react"

export default function AnimationsDemo() {
  return (
    <Tabs defaultValue="basic">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">Basic Animations</TabsTrigger>
        <TabsTrigger value="list">List Animations</TabsTrigger>
        <TabsTrigger value="page">Page Transitions</TabsTrigger>
        <TabsTrigger value="gestures">Gestures</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="mt-0">
        <BasicAnimations />
      </TabsContent>

      <TabsContent value="list" className="mt-0">
        <ListAnimations />
      </TabsContent>

      <TabsContent value="page" className="mt-0">
        <PageTransitions />
      </TabsContent>

      <TabsContent value="gestures" className="mt-0">
        <GestureAnimations />
      </TabsContent>
    </Tabs>
  )
}

function BasicAnimations() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fade & Scale</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button onClick={() => setIsVisible(!isVisible)} className="mb-6" variant="outline">
              {isVisible ? "Hide" : "Show"}
            </Button>

            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center text-white"
                >
                  Fade & Scale
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hover & Tap Effects</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white cursor-pointer"
            >
              Hover & Tap Me
            </motion.div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyframe Animation</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["10%", "10%", "50%", "50%", "10%"],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
            className="w-32 h-32 bg-green-500 flex items-center justify-center text-white"
          >
            Keyframes
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}

function ListAnimations() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ])

  const addItem = () => {
    const newItem = {
      id: Math.max(0, ...items.map((item) => item.id)) + 1,
      text: `Item ${items.length + 1}`,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <Button onClick={addItem} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Item
      </Button>

      <div className="border rounded-md overflow-hidden">
        <motion.ul className="divide-y">
          <AnimatePresence>
            {items.map((item) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-4"
              >
                <span>{item.text}</span>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          This example demonstrates animated list items with smooth enter/exit animations. Try adding and removing items
          to see the animations.
        </p>
      </div>
    </div>
  )
}

function PageTransitions() {
  const [page, setPage] = useState(0)

  const pages = [
    { title: "Welcome", color: "bg-blue-500" },
    { title: "About", color: "bg-green-500" },
    { title: "Contact", color: "bg-purple-500" },
  ]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const [[currentPage, direction], setCurrentPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const nextPage = currentPage + newDirection
    if (nextPage >= 0 && nextPage < pages.length) {
      setCurrentPage([nextPage, newDirection])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => paginate(-1)} disabled={currentPage === 0} variant="outline">
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {pages.length}
        </span>
        <Button onClick={() => paginate(1)} disabled={currentPage === pages.length - 1} variant="outline">
          Next
        </Button>
      </div>

      <div className="relative h-64 overflow-hidden rounded-lg border">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 ${pages[currentPage].color} flex items-center justify-center text-white text-2xl font-bold`}
          >
            {pages[currentPage].title}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm">
          This example demonstrates page transitions with direction-aware animations. The pages slide in from the right
          when going forward and from the left when going backward.
        </p>
      </div>
    </div>
  )
}

function GestureAnimations() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Drag</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pt-4 h-48">
            <motion.div
              drag
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
              className="w-24 h-24 bg-yellow-500 rounded-lg flex items-center justify-center text-white cursor-grab active:cursor-grabbing"
            >
              Drag me
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <div
                className="p-4 flex justify-between items-center cursor-pointer bg-muted/50"
                onClick={() => setIsOpen(!isOpen)}
              >
                <h3 className="font-medium">Click to expand</h3>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 border-t">
                      <p>This is the accordion content that animates in and out smoothly when the header is clicked.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Framer Motion Features Demonstrated:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Drag gestures with constraints</li>
          <li>Accordion animations with AnimatePresence</li>
          <li>Smooth height animations</li>
          <li>Interactive elements with visual feedback</li>
        </ul>
      </div>
    </div>
  )
}
