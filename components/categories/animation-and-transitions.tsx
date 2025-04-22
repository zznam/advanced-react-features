"use client"

import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react"

export default function AnimationAndTransitions() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Animation & Transitions</h2>
      <p className="text-muted-foreground mb-8">
        Techniques for creating smooth animations and transitions in React applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="41. CSS Transitions"
          description="Use CSS transitions for simple animations between states."
          level="beginner"
          docs="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions"
        >
          <CSSTransitionsDemo />
        </FeatureCard>

        <FeatureCard
          title="42. CSS Animations"
          description="Use CSS animations for more complex, keyframe-based animations."
          level="intermediate"
          docs="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations"
        >
          <CSSAnimationsDemo />
        </FeatureCard>

        <FeatureCard
          title="43. Framer Motion Basics"
          description="Use Framer Motion for declarative animations in React."
          level="intermediate"
          docs="https://www.framer.com/motion/"
        >
          <FramerMotionBasicsDemo />
        </FeatureCard>

        <FeatureCard
          title="44. Animated Page Transitions"
          description="Create smooth transitions between pages or views."
          level="advanced"
          docs="https://www.framer.com/motion/animate-presence/"
        >
          <AnimatedPageTransitionsDemo />
        </FeatureCard>

        <FeatureCard
          title="45. Gesture Animations"
          description="Create animations that respond to user gestures like drag, hover, and tap."
          level="advanced"
          docs="https://www.framer.com/motion/gestures/"
        >
          <GestureAnimationsDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 41. CSS Transitions Demo
function CSSTransitionsDemo() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">Simple Transitions</h3>
          <div className="space-y-4">
            <div
              className={`p-4 rounded-md transition-all duration-300 ease-in-out ${
                isExpanded ? "bg-primary text-primary-foreground h-40" : "bg-muted h-20"
              }`}
            >
              <p>This element transitions its height, background color, and text color.</p>
            </div>
            <Button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Collapse" : "Expand"}</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Button State Transitions</h3>
          <div className="space-y-4">
            <button
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                isActive ? "bg-green-500 text-white translate-y-1 shadow-sm" : "bg-gray-200 text-gray-800 shadow-md"
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Active State" : "Inactive State"}
            </button>
            <p className="text-sm text-muted-foreground">
              Click the button to see transitions between active and inactive states.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Hover Transitions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border rounded-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-muted"
              onMouseEnter={() => setHoverIndex(item)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <h4 className="font-medium mb-2">Card {item}</h4>
              <p className="text-sm text-muted-foreground">
                Hover over this card to see transitions for shadow, scale, and background.
              </p>
              {hoverIndex === item && <p className="text-xs mt-2 text-primary">Currently hovering!</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          CSS transitions provide a way to control animation speed when changing CSS properties. They allow property
          changes to occur smoothly over a specified duration instead of happening instantly.
        </p>
        <p className="mt-2">
          Key properties include: <code>transition-property</code>, <code>transition-duration</code>,{" "}
          <code>transition-timing-function</code>, and <code>transition-delay</code>.
        </p>
      </div>
    </div>
  )
}

// 42. CSS Animations Demo
function CSSAnimationsDemo() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState("pulse")

  const animations = {
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    spin: "animate-spin",
    ping: "animate-ping",
    custom: "custom-animation",
  }

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes colorChange {
          0% {
            background-color: #f3f4f6;
          }
          50% {
            background-color: #e0f2fe;
          }
          100% {
            background-color: #f3f4f6;
          }
        }

        .custom-animation {
          animation: colorChange 2s infinite;
        }

        .slide-in {
          animation: slideIn 1s ease-out forwards;
        }

        .fade-in-out {
          animation: fadeInOut 2s ease-in-out infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">Tailwind Animations</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              {Object.keys(animations).map((animation) => (
                <Button
                  key={animation}
                  variant={selectedAnimation === animation ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAnimation(animation)}
                >
                  {animation}
                </Button>
              ))}
            </div>
            <div className="flex justify-center p-8 border rounded-md">
              <div
                className={`w-16 h-16 bg-primary rounded-md ${
                  isAnimating ? animations[selectedAnimation as keyof typeof animations] : ""
                }`}
              ></div>
            </div>
            <Button onClick={() => setIsAnimating(!isAnimating)}>
              {isAnimating ? "Stop Animation" : "Start Animation"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Custom Keyframe Animations</h3>
          <div className="space-y-4">
            <div className="border rounded-md p-4 overflow-hidden">
              <div className={isAnimating ? "slide-in" : "opacity-0"}>
                <h4 className="font-medium mb-2">Slide In Animation</h4>
                <p className="text-sm text-muted-foreground">
                  This content slides in from the left with a custom keyframe animation.
                </p>
              </div>
            </div>
            <div className="border rounded-md p-4 flex justify-center">
              <div className={`w-4 h-4 rounded-full bg-primary ${isAnimating ? "fade-in-out" : ""}`}></div>
            </div>
            <Button onClick={() => setIsAnimating(!isAnimating)}>
              {isAnimating ? "Reset Animations" : "Play Animations"}
            </Button>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          CSS animations allow you to create complex, multi-step animations using keyframes. Unlike transitions, which
          are limited to a single state change, animations can have multiple steps and run continuously.
        </p>
        <p className="mt-2">
          Key properties include: <code>animation-name</code>, <code>animation-duration</code>,{" "}
          <code>animation-timing-function</code>, <code>animation-delay</code>, <code>animation-iteration-count</code>,
          and <code>animation-direction</code>.
        </p>
      </div>
    </div>
  )
}

// 43. Framer Motion Basics Demo
function FramerMotionBasicsDemo() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">Basic Animations</h3>
          <div className="space-y-4">
            <Button onClick={() => setIsVisible(!isVisible)} className="mb-4">
              {isVisible ? "Hide" : "Show"}
            </Button>

            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-32 bg-primary rounded-lg flex items-center justify-center text-primary-foreground"
                >
                  Fade & Scale
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Hover & Tap Effects</h3>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: "#e0f2fe" }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-32 bg-muted rounded-lg flex items-center justify-center cursor-pointer"
            >
              Hover & Tap Me
            </motion.div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Keyframe Animation</h3>
        <div className="flex justify-center">
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
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Framer Motion is a production-ready motion library for React that makes it easy to create animations and
          interactive UIs. It provides a simple declarative syntax for animations and gestures.
        </p>
        <p className="mt-2">
          Key features include: spring animations, keyframes, gestures, layout animations, and exit animations with
          AnimatePresence.
        </p>
      </div>
    </div>
  )
}

// 44. Animated Page Transitions Demo
function AnimatedPageTransitionsDemo() {
  const [page, setPage] = useState(0)

  const pages = [
    { title: "Home", color: "bg-blue-100" },
    { title: "About", color: "bg-green-100" },
    { title: "Contact", color: "bg-purple-100" },
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
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Page Transitions</h3>
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
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`absolute inset-0 ${pages[currentPage].color} flex items-center justify-center text-2xl font-bold`}
            >
              {pages[currentPage].title}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Modal Transitions</h3>
        <ModalTransitionDemo />
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Animated page transitions create a smoother user experience when navigating between different views or pages.
          They help maintain context and provide visual cues about navigation direction.
        </p>
        <p className="mt-2">
          Framer Motion's AnimatePresence component is particularly useful for exit animations, allowing elements to
          animate out before they're removed from the DOM.
        </p>
      </div>
    </div>
  )
}

// Helper component for page transitions demo
function ModalTransitionDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-background rounded-lg p-6 w-full max-w-md shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Animated Modal</h3>
              <p className="mb-4">This modal animates in and out using Framer Motion's AnimatePresence component.</p>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 45. Gesture Animations Demo
function GestureAnimationsDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Drag Gesture</h3>
            <div className="h-48 border rounded-md relative flex items-center justify-center">
              <motion.div
                drag
                dragConstraints={{
                  top: -50,
                  left: -50,
                  right: 50,
                  bottom: 50,
                }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1 }}
                animate={{ x: dragPosition.x, y: dragPosition.y }}
                onDragEnd={(_, info) => {
                  setDragPosition({
                    x: dragPosition.x + info.offset.x,
                    y: dragPosition.y + info.offset.y,
                  })
                }}
                className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center text-primary-foreground cursor-grab active:cursor-grabbing"
              >
                Drag me
              </motion.div>
            </div>
            <Button onClick={() => setDragPosition({ x: 0, y: 0 })} className="mt-4" variant="outline" size="sm">
              Reset Position
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Accordion Animation</h3>
            <div className="border rounded-md overflow-hidden">
              <div
                className="p-4 flex justify-between items-center cursor-pointer bg-muted/50"
                onClick={() => setIsOpen(!isOpen)}
              >
                <h4 className="font-medium">Click to expand</h4>
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

      <div className="space-y-4">
        <h3 className="font-medium">List Item Animations</h3>
        <ListItemAnimationsDemo />
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Gesture animations respond to user interactions like dragging, hovering, and tapping. They create a more
          interactive and engaging user experience.
        </p>
        <p className="mt-2">
          Framer Motion provides built-in support for gestures with props like <code>drag</code>,{" "}
          <code>whileHover</code>, <code>whileTap</code>, and <code>whileDrag</code>.
        </p>
      </div>
    </div>
  )
}

// Helper component for gesture animations demo
function ListItemAnimationsDemo() {
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
    </div>
  )
}
