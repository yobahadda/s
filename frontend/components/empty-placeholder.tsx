"use client"

import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

interface EmptyPlaceholderProps {
  title: string
  description: string
  buttonText?: string
  buttonAction?: () => void
}

export function EmptyPlaceholder({ title, description, buttonText, buttonAction }: EmptyPlaceholderProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Users className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{description}</p>
      {buttonText && buttonAction && <Button onClick={buttonAction}>{buttonText}</Button>}
    </div>
  )
}

