import { mdiInformationOutline } from "@mdi/js"
import Icon from "@mdi/react"
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react"
import { useEffect, useState } from "react"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"
import { PortletSendMethod } from "~sml-app-kit/portlets/schema/portlets.types"

const expiryMinutesLabelMap = new Map<number, string>([
  [5, "5 minutes"],
  [15, "15 minutes"],
  [60, "1 hour"],
  [90, "90 minutes"],
  [360, "6 hours"],
  [1440, "24 hours"],
])

export default function SendModal({
  sendMethod,
  portletSessionId,
  ...disclosureProps
}: { sendMethod: PortletSendMethod; portletSessionId: string } & ReturnType<typeof useDisclosure>) {
  const { isOpen, onOpenChange } = disclosureProps
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data
  const [customExpiryMinutes, setCustomExpiryMinutes] = useState<number | null>(null)

  useEffect(() => {
    if (portletSession) {
      if (!customExpiryMinutes && portletSession?.portlet?.defaultExpiryMinutes) {
        setCustomExpiryMinutes(portletSession.portlet.defaultExpiryMinutes)
      }
    }
  }, [portletSession, customExpiryMinutes])

  const titleMap: Record<PortletSendMethod, string> = {
    email: "Send via Email",
    sms: "Send via Text Message",
    link: portletSession?.stage === "draft" ? "Activate Link" : "Copy Link",
  }

  const [showExpiryButtons, setShowExpiryButtons] = useState(false)

  const showSendActions = sendMethod === "email" || sendMethod === "sms"
  const recipientText = `${portletSession?.recipientName}: ${sendMethod === "sms" ? portletSession?.recipientPhoneNumber : portletSession?.recipientEmail}`
  const currentExpiryValue = customExpiryMinutes || portletSession?.portlet?.defaultExpiryMinutes
  const expiryLabel = currentExpiryValue ? expiryMinutesLabelMap.get(currentExpiryValue) : "--:--"

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h1>{titleMap[sendMethod]}</h1>
            </ModalHeader>
            <ModalBody>
              {/* ACTIVATION OPTIONS */}
              {portletSession?.stage === "draft" && (
                <div className="flex flex-col space-y-2 rounded border border-secondary bg-secondary-100 p-4">
                  <div className="flex items-center space-x-2 text-secondary">
                    <Icon path={mdiInformationOutline} className="w-5" />
                    <p className="font-medium">This will activate the portlet session</p>
                  </div>
                  <p className="text-sm">
                    Once activated, you will no longer be able to change the recipient. The session
                    will be active for <strong>{expiryLabel}</strong>.
                  </p>
                  {showExpiryButtons ? (
                    <ScrollShadow className="max-w-full py-4" orientation="horizontal" size={15}>
                      <ButtonGroup className="w-full justify-start">
                        {Array.from(expiryMinutesLabelMap.entries()).map(([minutes, label]) => {
                          return (
                            <Button
                              key={minutes}
                              color="secondary"
                              variant={minutes === currentExpiryValue ? "solid" : "ghost"}
                              className="shrink-0"
                              onPress={() => setCustomExpiryMinutes(minutes)}
                            >
                              {label}
                            </Button>
                          )
                        })}
                      </ButtonGroup>
                    </ScrollShadow>
                  ) : (
                    <Button
                      size="sm"
                      color="secondary"
                      variant="faded"
                      className="align-self-start w-fit"
                      onPress={() => setShowExpiryButtons(true)}
                    >
                      Change expiration
                    </Button>
                  )}
                </div>
              )}
              {/* SEND ACTIONS */}
              {showSendActions && <p>{recipientText}</p>}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
