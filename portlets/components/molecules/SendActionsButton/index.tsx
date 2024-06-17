import { mdiChevronDown } from "@mdi/js"
import Icon from "@mdi/react"
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  ButtonGroupVariantProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { useState } from "react"
import {
  PortletComponentProps,
  PortletDeliveryMethod,
  PortletSesssionStage,
} from "~sml-app-kit/portlets/types"

const labelMap: Partial<Record<PortletSesssionStage, Record<PortletDeliveryMethod, string>>> = {
  draft: {
    email: "Send via Email",
    sms: "Send via Text Message",
    link: "Activate link",
  },
  active: {
    email: "Resend via Email",
    sms: "Resend via Text Message",
    link: "Copy link",
  },
}
export default function SendActionsButton({
  initialSelectedType,
  variant,
  ...potletContext
}: PortletComponentProps & {
  variant?: ButtonGroupProps["variant"]
  initialSelectedType?: PortletDeliveryMethod
}) {
  const [selectedAction, setSelectedAction] = useState<PortletDeliveryMethod>("email")

  return (
    <ButtonGroup color="primary" className="w-full justify-stretch" variant={variant}>
      <Button className="w-full font-semibold">Send via Email</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <Icon path={mdiChevronDown} className="w-4" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key={"email"}>Send via Email</DropdownItem>
          <DropdownItem key={"sms"}>Send via Text Message</DropdownItem>
          <DropdownItem key={"link"}>Activate link</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
