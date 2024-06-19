import { ButtonGroup, ButtonProps, DropdownItemProps } from "@nextui-org/react"
import React from "react"

type ButtonDropdownItem = {
  key: string
  text: string
  content?: React.ReactNode
}

export default function ButtonWithDropdown({
  defaultSelectedKey,
  items,
}: {
  defaultSelectedKey?: string
  items: ButtonDropdownItem[]
}) {
  return <ButtonGroup></ButtonGroup>
}
