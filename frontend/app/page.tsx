"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { UserForm } from "@/components/user-form"
import { UserList } from "@/components/user-list"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

// Define the User type
interface User {
  id: string
  username: string
  email: string
}

export default function UserManagement() {
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
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async (userData: Omit<User, "id"> & { id: string }) => {
    try {
      await axios.post(`${API_URL}/users`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      toast({
        title: "Success",
        description: "User created successfully!",
      })
      fetchUsers() // Refresh the user list
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Error",
        description: "Failed to create user. Please check the data and try again.",
        variant: "destructive",
      })
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`)
      toast({
        title: "Success",
        description: "User deleted successfully!",
      })
      fetchUsers() // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">User Management System</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg shadow-lg p-6">
            <UserForm onSubmit={createUser} />
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6">
            <UserList users={users} isLoading={isLoading} onDelete={deleteUser} />
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  )
}

