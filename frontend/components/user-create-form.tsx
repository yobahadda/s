"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, User, Mail, Key } from "lucide-react"
import type { User as UserType } from "@/app/page"

const formSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(50, { message: "Username must be less than 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})

interface UserCreateFormProps {
  onSubmit: (data: UserType) => Promise<boolean>
}

export function UserCreateForm({ onSubmit }: UserCreateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      username: "",
      email: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const success = await onSubmit(values)
    setIsSubmitting(false)

    if (success) {
      form.reset()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
        <CardDescription>Add a new user to your system. All fields are required.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Enter unique ID" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>A unique identifier for this user</FormDescription>
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
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="Enter username" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>The display name for this user</FormDescription>
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
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" type="email" placeholder="Enter email address" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>The contact email for this user</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
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
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

