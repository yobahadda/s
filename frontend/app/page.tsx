"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UserCreateForm } from "@/components/user-create-form"
import { UserTable } from "@/components/user-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { UserStats } from "@/components/user-stats"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export interface User {
  id: string
  username: string
  email: string
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const API_URL = "http://localhost:5000"

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}/users`)
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error fetching users",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (userData: User) => {
    try {
      await axios.post(`${API_URL}/users`, userData, {
        headers: { "Content-Type": "application/json" },
      })
      toast({
        title: "User created",
        description: `${userData.username} has been added successfully.`,
      })
      fetchUsers()
      return true
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Failed to create user",
        description: "Please check the data and try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteUser = async (userId: string, username: string) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`)
      toast({
        title: "User deleted",
        description: `${username} has been removed.`,
      })
      fetchUsers()
      return true
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Failed to delete user",
        description: "Please try again later.",
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <DashboardShell>
        <DashboardHeader heading="User Management" text="Create and manage users in your system." />

        <div className="grid gap-8">
          <UserStats userCount={users.length} />

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">User List</TabsTrigger>
              <TabsTrigger value="create">Create User</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              {isLoading ? (
                <UserTable users={[]} isLoading={true} onDelete={() => Promise.resolve(false)} />
              ) : users.length === 0 ? (
                <EmptyPlaceholder
                  title="No users found"
                  description="Create your first user to get started."
                  buttonText="Create User"
                  buttonAction={() => document.querySelector('[data-value="create"]')?.click()}
                />
              ) : (
                <UserTable users={users} isLoading={false} onDelete={deleteUser} />
              )}
            </TabsContent>

            <TabsContent value="create">
              <UserCreateForm onSubmit={createUser} />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardShell>
      <Toaster />
    </>
  )
}

