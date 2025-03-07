import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

interface UserStatsProps {
  userCount: number
}

export function UserStats({ userCount }: UserStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCount}</div>
          <p className="text-xs text-muted-foreground">
            {userCount === 0
              ? "No users in the system"
              : userCount === 1
                ? "1 user in the system"
                : `${userCount} users in the system`}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

