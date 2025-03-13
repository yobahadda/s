import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Wifi, WifiOff, Loader2 } from "lucide-react"

interface ApiStatusProps {
  status: "online" | "offline" | "loading"
}

export function ApiStatus({ status }: ApiStatusProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            {status === "online" && (
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <Wifi className="h-3 w-3 mr-1" />
                API Online
              </Badge>
            )}

            {status === "offline" && (
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                <WifiOff className="h-3 w-3 mr-1" />
                API Offline
              </Badge>
            )}

            {status === "loading" && (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Connecting
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {status === "online" && "Backend API is connected and responding"}
          {status === "offline" && "Cannot connect to the backend API"}
          {status === "loading" && "Checking connection to backend API"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

