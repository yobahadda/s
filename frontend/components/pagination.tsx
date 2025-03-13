"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first and last page
      // Show pages around current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the start or end
      if (currentPage <= 2) {
        endPage = 4
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      // Add first page
      pageNumbers.push(1)

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end")
      }

      // Add last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button variant="outline" size="icon" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <ChevronsLeft className="h-4 w-4" />
        <span className="sr-only">First page</span>
      </Button>

      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <span key={`${page}-${index}`} className="px-2">
              &hellip;
            </span>
          )
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page as number)}
            className="h-8 w-8 p-0"
          >
            {page}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
        <span className="sr-only">Last page</span>
      </Button>
    </div>
  )
}

