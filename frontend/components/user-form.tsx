"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UserPlus, Loader2 } from "lucide-react"

const formSchema = z.object({
  id: z.string().min(1, { message: "User ID is required" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50, { message: "Username must be less than 50 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must be less than 100 characters" }),
})

type FormValues = z.infer<typeof formSchema>

interface UserFormProps {
  onSubmit: (data: FormValues) => Promise<void>
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      username: "",
      email: "",
    },
  })

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full border-border/10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <UserPlus className="h-5 w-5" />
              Create New User
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Add a new user to the system. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unique user ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
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
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}

