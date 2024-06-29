import { mdiChevronDown } from "@mdi/js"
import Icon from "@mdi/react"
import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
  useDisclosure,
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import SendModal from "./parts/SendModal"
import usePortletSessionQuery from "~sml-app-kit/modules/portlets/hooks/usePortletSessionQuery"
import { PortletSendMethod } from "~sml-app-kit/modules/portlets/schema/portlets.types"

export default function SendActions({
  portletSessionId,
  ...buttonGroupProps
}: { portletSessionId: string } & ButtonGroupProps) {
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data
  const [selectedMethod, setSelectedMethod] = useState<PortletSendMethod>("email")

  useEffect(() => {
    if (portletSession) {
      if (!portletSession.recipientPhoneNumber && selectedMethod === "sms") {
        setSelectedMethod("email")
      }
    }
  }, [portletSession, selectedMethod])

  const handleSelect = (keys: Selection) => {
    if (keys === "all") return
    const array = Array.from(keys)
    const selected = array[0] as PortletSendMethod
    setSelectedMethod(selected)
  }

  const labelsMap: Record<PortletSendMethod, string> = {
    email: "Send via Email",
    sms: "Send via Text Message",
    link: portletSession?.stage === "draft" ? "Activate Link" : "Copy Link",
  }

  const allDisabled = !portletSession?.recipientEmail || !portletSession?.recipientName
  const smsDisabled = !portletSession?.recipientPhoneNumber

  const modalDisclosure = useDisclosure()

  return (
    <>
      <ButtonGroup color="primary" isDisabled={allDisabled} {...buttonGroupProps}>
        <Button className="w-full font-semibold" onPress={modalDisclosure.onOpen}>
          {labelsMap[selectedMethod]}
        </Button>
        <Dropdown placement="top-end">
          <DropdownTrigger>
            <Button isIconOnly>
              <Icon path={mdiChevronDown} className="w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Send actions"
            disallowEmptySelection
            selectedKeys={[selectedMethod]}
            selectionMode="single"
            onSelectionChange={handleSelect}
            disabledKeys={smsDisabled ? ["sms"] : undefined}
          >
            <DropdownItem key="email">{labelsMap.email}</DropdownItem>
            <DropdownItem
              key="sms"
              description={smsDisabled ? "No phone number provided" : undefined}
            >
              {labelsMap.sms}
            </DropdownItem>
            <DropdownItem key="link">{labelsMap.link}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
      <SendModal
        portletSessionId={portletSessionId}
        sendMethod={selectedMethod}
        {...modalDisclosure}
      />
    </>
  )
}
