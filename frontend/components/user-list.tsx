"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Users, Trash2, Mail, UserIcon } from "lucide-react"

interface User {
  id: string
  username: string
  email: string
}

interface UserListProps {
  users: User[]
  isLoading: boolean
  onDelete: (userId: string) => void
}

export function UserList({ users, isLoading, onDelete }: UserListProps) {
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const handleDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete)
      setUserToDelete(null)
    }
  }

  return (
    <>
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5" />
          User List
        </CardTitle>
        <CardDescription>Manage existing users</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => setUserToDelete(user.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the user {user.username}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </>
  )
}

