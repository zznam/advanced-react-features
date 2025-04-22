"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

// Define the form schema with Zod
const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
    bio: z.string().max(160, { message: "Bio must be at most 160 characters" }).optional(),
    role: z.string({
      required_error: "Please select a role",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Define the multi-step form schema
const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})

const addressSchema = z.object({
  street: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid ZIP code" }),
})

const accountSchema = z
  .object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function FormValidationDemo() {
  return (
    <Tabs defaultValue="basic">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">Basic Form</TabsTrigger>
        <TabsTrigger value="multistep">Multi-Step Form</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="mt-0">
        <BasicForm />
      </TabsContent>

      <TabsContent value="multistep" className="mt-0">
        <MultiStepForm />
      </TabsContent>
    </Tabs>
  )
}

function BasicForm() {
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null)

  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
      role: "",
      terms: false,
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values)
    toast({
      title: "Form submitted!",
      description: "Your form has been successfully submitted.",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>This will be your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters with uppercase, lowercase, and numbers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself" {...field} />
                    </FormControl>
                    <FormDescription>Max 160 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Accept terms and conditions</FormLabel>
                      <FormDescription>You agree to our Terms of Service and Privacy Policy.</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {formData && (
        <Card>
          <CardHeader>
            <CardTitle>Submitted Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">{JSON.stringify(formData, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  // Personal info form
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    },
  })

  // Address form
  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    },
  })

  // Account form
  const accountForm = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  })

  const handlePersonalInfoSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    setFormData({ ...formData, ...data })
    setStep(2)
  }

  const handleAddressSubmit = (data: z.infer<typeof addressSchema>) => {
    setFormData({ ...formData, ...data })
    setStep(3)
  }

  const handleAccountSubmit = (data: z.infer<typeof accountSchema>) => {
    const finalData = { ...formData, ...data }
    setFormData(finalData)
    toast({
      title: "Registration complete!",
      description: "Your account has been successfully created.",
    })
    // In a real app, you would submit the data to your backend here
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between mb-4">
        <div className={`flex-1 text-center pb-2 ${step === 1 ? "border-b-2 border-primary" : ""}`}>Personal Info</div>
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
          {step === 1 && (
            <Form {...personalInfoForm}>
              <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-4">
                <FormField
                  control={personalInfoForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalInfoForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalInfoForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit">Next</Button>
                </div>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...addressForm}>
              <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
                <FormField
                  control={addressForm.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addressForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit">Next</Button>
                </div>
              </form>
            </Form>
          )}

          {step === 3 && (
            <Form {...accountForm}>
              <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)} className="space-y-4">
                <FormField
                  control={accountForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={accountForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={accountForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit">Complete Registration</Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Form Validation Features:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Schema-based validation with Zod</li>
          <li>Form state management with React Hook Form</li>
          <li>Real-time validation feedback</li>
          <li>Multi-step form with state persistence</li>
          <li>Custom validation rules and error messages</li>
        </ul>
      </div>
    </div>
  )
}
