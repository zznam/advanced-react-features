"use client"

import React from "react"

import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormHandling() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Form Handling</h2>
      <p className="text-muted-foreground mb-8">Techniques and patterns for handling forms in React applications.</p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="46. Controlled Components"
          description="Manage form inputs with React state."
          level="beginner"
          docs="https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable"
        >
          <ControlledComponentsDemo />
        </FeatureCard>

        <FeatureCard
          title="47. Uncontrolled Components"
          description="Access form values using refs instead of state."
          level="intermediate"
          docs="https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form"
        >
          <UncontrolledComponentsDemo />
        </FeatureCard>

        <FeatureCard
          title="48. Form Validation"
          description="Validate form inputs and display error messages."
          level="intermediate"
          docs="https://react.dev/reference/react-dom/components/input#displaying-input-validation-errors"
        >
          <FormValidationDemo />
        </FeatureCard>

        <FeatureCard
          title="49. Multi-step Forms"
          description="Create forms with multiple steps or pages."
          level="advanced"
          docs="https://react.dev/learn/sharing-state-between-components"
        >
          <MultiStepFormDemo />
        </FeatureCard>

        <FeatureCard
          title="50. Dynamic Form Fields"
          description="Add and remove form fields dynamically."
          level="intermediate"
          docs="https://react.dev/learn/updating-arrays-in-state"
        >
          <DynamicFormFieldsDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 46. Controlled Components Demo
function ControlledComponentsDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Controlled Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </div>

        <div>
          <h3 className="font-medium mb-4">Form State</h3>
          <div className="p-4 border rounded-md bg-muted">
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            With controlled components, React state is the "single source of truth" for form inputs. The form element's
            displayed value is controlled by React.
          </p>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Controlled components are form elements whose values are controlled by React state. This approach gives you
          more control over the form and makes it easier to:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Validate input values as they change</li>
          <li>Conditionally disable the submit button</li>
          <li>Enforce input formats</li>
          <li>Implement instant feedback</li>
        </ul>
      </div>
    </div>
  )
}

// 47. Uncontrolled Components Demo
function UncontrolledComponentsDemo() {
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const messageRef = React.useRef<HTMLTextAreaElement>(null)
  const [formData, setFormData] = useState<Record<string, string> | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      message: messageRef.current?.value || "",
    }

    setFormData(data)
    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`)
  }

  const handleReset = () => {
    if (nameRef.current) nameRef.current.value = ""
    if (emailRef.current) emailRef.current.value = ""
    if (messageRef.current) messageRef.current.value = ""
    setFormData(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Uncontrolled Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-uncontrolled">Name</Label>
              <Input id="name-uncontrolled" name="name" ref={nameRef} defaultValue="" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-uncontrolled">Email</Label>
              <Input
                id="email-uncontrolled"
                name="email"
                type="email"
                ref={emailRef}
                defaultValue=""
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message-uncontrolled">Message</Label>
              <Textarea
                id="message-uncontrolled"
                name="message"
                ref={messageRef}
                defaultValue=""
                placeholder="Enter your message"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="font-medium mb-4">Submitted Data</h3>
          <div className="p-4 border rounded-md bg-muted">
            {formData ? (
              <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
            ) : (
              <p className="text-sm text-muted-foreground">No data submitted yet</p>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            With uncontrolled components, form data is handled by the DOM itself. Values are accessed using refs when
            needed (typically on form submission).
          </p>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Uncontrolled components let the DOM handle form data internally. This approach can be simpler for basic forms
          and offers some advantages:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Less code for simple forms</li>
          <li>Better performance (no re-renders on every keystroke)</li>
          <li>Easier integration with non-React code</li>
          <li>Useful for one-time form submissions</li>
        </ul>
      </div>
    </div>
  )
}

// 48. Form Validation Demo
function FormValidationDemo() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
    validateField(name, formData[name as keyof typeof formData])
  }

  const validateField = (name: string, value: string) => {
    let error = ""

    switch (name) {
      case "username":
        if (!value) {
          error = "Username is required"
        } else if (value.length < 3) {
          error = "Username must be at least 3 characters"
        }
        break
      case "email":
        if (!value) {
          error = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid"
        }
        break
      case "password":
        if (!value) {
          error = "Password is required"
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters"
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least one uppercase letter"
        } else if (!/[0-9]/.test(value)) {
          error = "Password must contain at least one number"
        }
        break
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password"
        } else if (value !== formData.password) {
          error = "Passwords do not match"
        }
        break
      default:
        break
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }

    return !error
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    // Validate all fields
    Object.entries(formData).forEach(([name, value]) => {
      if (!validateField(name, value)) {
        isValid = false
      }
    })

    // Mark all fields as touched
    const newTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach((name) => {
      newTouched[name] = true
    })
    setTouched(newTouched)

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      alert(`Form submitted successfully: ${JSON.stringify(formData, null, 2)}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Validated Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter username"
                className={errors.username && touched.username ? "border-red-500" : ""}
              />
              {errors.username && touched.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter email"
                className={errors.email && touched.email ? "border-red-500" : ""}
              />
              {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password"
                className={errors.password && touched.password ? "border-red-500" : ""}
              />
              {errors.password && touched.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm password"
                className={errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </div>

        <div>
          <h3 className="font-medium mb-4">Validation Rules</h3>
          <div className="space-y-2">
            <div className="p-3 border rounded-md">
              <h4 className="text-sm font-medium">Username</h4>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>Required</li>
                <li>At least 3 characters</li>
              </ul>
            </div>

            <div className="p-3 border rounded-md">
              <h4 className="text-sm font-medium">Email</h4>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>Required</li>
                <li>Valid email format</li>
              </ul>
            </div>

            <div className="p-3 border rounded-md">
              <h4 className="text-sm font-medium">Password</h4>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>Required</li>
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one number</li>
              </ul>
            </div>

            <div className="p-3 border rounded-md">
              <h4 className="text-sm font-medium">Confirm Password</h4>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>Required</li>
                <li>Must match password</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Form validation ensures that user input meets certain criteria before submission. This improves data quality
          and provides immediate feedback to users.
        </p>
        <p className="mt-2">Common validation approaches include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Client-side validation for immediate feedback</li>
          <li>Server-side validation for security</li>
          <li>Validation on blur for a better user experience</li>
          <li>Validation on submit to check all fields at once</li>
        </ul>
      </div>
    </div>
  )
}

// 49. Multi-step Forms Demo
function MultiStepFormDemo() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    // Step 2: Address
    street: "",
    city: "",
    state: "",
    zipCode: "",
    // Step 3: Account
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`)
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      username: "",
      password: "",
    })
    setStep(1)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Multi-step Form</h3>

        <div className="flex justify-between mb-4">
          <div className={`flex-1 text-center pb-2 ${step === 1 ? "border-b-2 border-primary" : ""}`}>
            Personal Info
          </div>
          <div className={`flex-1 text-center pb-2 ${step === 2 ? "border-b-2 border-primary" : ""}`}>Address</div>
          <div className={`flex-1 text-center pb-2 ${step === 3 ? "border-b-2 border-primary" : ""}`}>Account</div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Personal Information"}
              {step === 2 && "Address Information"}
              {step === 3 && "Account Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Enter street address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Enter ZIP code"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Choose a password"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between pt-2">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className={step > 1 ? "" : "ml-auto"}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Multi-step forms break complex forms into manageable sections, improving user experience by reducing cognitive
          load and form abandonment.
        </p>
        <p className="mt-2">Best practices include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Showing progress indicators</li>
          <li>Allowing users to navigate between steps</li>
          <li>Validating each step before proceeding</li>
          <li>Saving form state to prevent data loss</li>
          <li>Providing clear next/previous/submit buttons</li>
        </ul>
      </div>
    </div>
  )
}

// 50. Dynamic Form Fields Demo
function DynamicFormFieldsDemo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [items, setItems] = useState([{ id: 1, name: "", quantity: "", price: "" }])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleItemChange = (id: number, field: string, value: string) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
    setItems([...items, { id: newId, name: "", quantity: "", price: "" }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formSubmission = {
      ...formData,
      items,
    }
    alert(`Form submitted with: ${JSON.stringify(formSubmission, null, 2)}`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Dynamic Form Fields</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Invoice Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter invoice title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Items</h4>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium">Item {index + 1}</h5>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`item-name-${item.id}`}>Name</Label>
                      <Input
                        id={`item-name-${item.id}`}
                        value={item.name}
                        onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                        placeholder="Item name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                      <Input
                        id={`item-quantity-${item.id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                        placeholder="Quantity"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-price-${item.id}`}>Price</Label>
                      <Input
                        id={`item-price-${item.id}`}
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, "price", e.target.value)}
                        placeholder="Price"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit">Submit Invoice</Button>
        </form>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Dynamic form fields allow users to add or remove form fields as needed. This is useful for forms where the
          number of inputs isn't known in advance, such as:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Invoice or order forms with multiple line items</li>
          <li>Contact forms with multiple phone numbers or email addresses</li>
          <li>Job applications with multiple work experiences or education entries</li>
          <li>Product forms with multiple variants or options</li>
        </ul>
      </div>
    </div>
  )
}
