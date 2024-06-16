import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import React from "react"

export default function PanelBox({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card shadow="none" className="shrink-0 border-2 border-default-200">
      <CardHeader className="pb-0">
        <h4 className="font-semibold text-default-500">{title}</h4>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  )
}
