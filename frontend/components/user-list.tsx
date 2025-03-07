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
import { Users, Trash2, Mail, UserIcon, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id: string
  username: string
  email: string
}

interface UserListProps {
  users: User[]
  isLoading: boolean
  onDelete: (userId: string) => Promise<void>
}

export function UserList({ users, isLoading, onDelete }: UserListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (userId: string) => {
    setDeletingId(userId)
    try {
      await onDelete(userId)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Card className="w-full border-border/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5" />
          User List
        </CardTitle>
        <CardDescription className="text-muted-foreground">Manage existing users and their information</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-4 border-border/10">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">No Users Found</h3>
              <p className="text-muted-foreground text-sm max-w-sm">Start by creating a new user using the form.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className="group overflow-hidden transition-all hover:shadow-md border-border/10">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">{user.username}</span>
                          <Badge variant="outline" className="ml-2 border-border/10">
                            ID: {user.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          <a href={`mailto:${user.email}`} className="hover:underline">
                            {user.email}
                          </a>
                        </div>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" disabled={deletingId === user.id}>
                            {deletingId === user.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="border-border/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the user &quot;{user.username}&quot;. This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(user.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

