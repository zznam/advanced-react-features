"use client"

import type React from "react"

import { useRef, forwardRef, useImperativeHandle, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Define the type for the imperative handle
type FormHandleRef = {
  reset: () => void
  validate: () => boolean
  submit: () => void
  focus: () => void
}

export default function ImperativeHandleDemo() {
  // Create a ref to hold the imperative methods
  const formRef = useRef<FormHandleRef>(null)
  const [message, setMessage] = useState("")

  const handleReset = () => {
    formRef.current?.reset()
    setMessage("Form has been reset")
  }

  const handleValidate = () => {
    const isValid = formRef.current?.validate()
    setMessage(isValid ? "Form is valid!" : "Form has validation errors!")
  }

  const handleSubmit = () => {
    formRef.current?.submit()
  }

  const handleFocus = () => {
    formRef.current?.focus()
    setMessage("First input focused")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Parent Controls</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              These buttons call methods exposed by the child component through useImperativeHandle
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleReset} variant="outline">
                Reset Form
              </Button>
              <Button onClick={handleValidate} variant="outline">
                Validate Form
              </Button>
              <Button onClick={handleSubmit} variant="outline">
                Submit Form
              </Button>
              <Button onClick={handleFocus} variant="outline">
                Focus First Input
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Child Component</h3>
          <ComplexForm ref={formRef} onMessage={setMessage} />
        </div>
      </div>

      {message && (
        <div className="bg-muted p-4 rounded-md mt-4">
          <p className="font-medium">Message:</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  )
}

// Create a forwarded ref component with imperative handle
const ComplexForm = forwardRef<FormHandleRef, { onMessage: (msg: string) => void }>(function ComplexForm(
  { onMessage },
  ref,
) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFormData({ name: "", email: "" })
      setErrors({})
    },
    validate: () => {
      const newErrors: Record<string, string> = {}

      if (!formData.name) {
        newErrors.name = "Name is required"
      }

      if (!formData.email) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
    submit: () => {
      const isValid = ref?.current?.validate()
      if (isValid) {
        onMessage(`Form submitted with: ${JSON.stringify(formData)}`)
      }
    },
    focus: () => {
      nameInputRef.current?.focus()
    },
  }))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              ref={nameInputRef}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button size="sm" onClick={() => ref?.current?.submit()}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
})
