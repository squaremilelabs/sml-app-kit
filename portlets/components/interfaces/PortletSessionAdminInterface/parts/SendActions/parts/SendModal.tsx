import {
  mdiCellphoneText,
  mdiContentCopy,
  mdiEmail,
  mdiInformationOutline,
  mdiLinkVariant,
  mdiPhone,
  mdiSendVariantOutline,
} from "@mdi/js"
import Icon from "@mdi/react"
import {
  Button,
  ButtonGroup,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
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

  const titleMap: Record<PortletSendMethod, string> = {
    email: "Send via Email",
    sms: "Send via Text Message",
    link: portletSession?.stage === "draft" ? "Activate Link" : "Copy Link",
  }

  /** ACTIVATION */
  const isActivating = portletSession?.stage === "draft"
  const [customExpiryMinutes, setCustomExpiryMinutes] = useState<number | null>(null)
  const [showExpiryButtons, setShowExpiryButtons] = useState(false)

  useEffect(() => {
    if (portletSession) {
      if (!customExpiryMinutes && portletSession?.portlet?.defaultExpiryMinutes) {
        setCustomExpiryMinutes(portletSession.portlet.defaultExpiryMinutes)
      }
    }
  }, [portletSession, customExpiryMinutes])

  const currentExpiryValue = customExpiryMinutes || portletSession?.portlet?.defaultExpiryMinutes
  const expiryLabel = currentExpiryValue ? expiryMinutesLabelMap.get(currentExpiryValue) : "--:--"

  /** SENDING */
  const [sendMessage, setSendMessage] = useState("")
  const isSendMethod = sendMethod === "email" || sendMethod === "sms"
  const sendIconPath = sendMethod === "email" ? mdiEmail : mdiCellphoneText

  /** LINK */
  const isLinkMethod = sendMethod === "link"

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="lg">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h1>{titleMap[sendMethod]}</h1>
            </ModalHeader>
            <ModalBody className="space-y-4">
              {/* ACTIVATION BOX (DRAFT ONLY) */}
              {isActivating && (
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
                    <ScrollShadow className="max-w-full py-4" orientation="horizontal" size={10}>
                      <ButtonGroup className="w-full justify-start" size="sm">
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
              {/* SEND DISPLAY */}
              {isSendMethod && (
                <div className="flex flex-col space-y-2">
                  <Chip
                    size="md"
                    radius="sm"
                    variant="faded"
                    classNames={{ content: "flex items-center space-x-1" }}
                  >
                    <Icon path={sendIconPath} className="w-4" />
                    <span>
                      {portletSession?.recipientName} [
                      {sendMethod === "email"
                        ? portletSession?.recipientEmail
                        : portletSession?.recipientPhoneNumber}
                      ]
                    </span>
                  </Chip>
                  <Textarea
                    label="Add a Custom Message (Optional)"
                    variant="faded"
                    value={sendMessage}
                    onValueChange={setSendMessage}
                  />
                </div>
              )}
              {/* LINK DISPLAY */}
              {isLinkMethod && (
                <div className="text-sm">
                  <strong className="font-semibold">
                    Anyone with the link will be able to access the portlet.
                  </strong>{" "}
                  Please make sure you are sending it securely to the recipient (
                  {portletSession?.recipientName}).
                </div>
              )}
            </ModalBody>
            <ModalFooter className="justify-stretch">
              <Button
                color="primary"
                className="w-full justify-between font-semibold"
                endContent={
                  <Icon
                    path={isSendMethod ? mdiSendVariantOutline : mdiLinkVariant}
                    className="w-4"
                  />
                }
              >
                {isActivating ? "Activate & " : ""}
                {isSendMethod ? "Send" : isActivating ? "Copy Link" : "Copy Link"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
