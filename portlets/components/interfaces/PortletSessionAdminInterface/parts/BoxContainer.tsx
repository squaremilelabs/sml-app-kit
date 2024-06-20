import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react"
import React from "react"

export default function BoxContainer({
  title,
  isLoading,
  isError,
  children,
}: {
  title: string
  isLoading: boolean
  isError: boolean
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="flex w-full flex-col space-y-2">
            <Skeleton className="h-6 w-3/4 rounded-full" />
            <Skeleton className="h-4 w-1/4 rounded-full" />
          </div>
        ) : isError ? (
          <div>
            <p>Error</p>
          </div>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  )
}
