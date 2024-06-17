import { PortletComponentProps } from "~sml-app-kit/portlets/types"
import RecipientForm from "./parts/RecipientForm"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"
import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, Chip, Divider, Skeleton } from "@nextui-org/react"
import PanelBox from "../../atoms/PanelBox"

export default function RecipientBox(props: PortletComponentProps) {
  const { portletRegistry, portletId, sessionId } = props
  const portlet = portletRegistry.getPortlet(portletId)
  const sessionQuery = usePortletSessionQuery(props)
  const session = sessionQuery?.data

  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    if (
      session?.stage === "draft" &&
      portlet?.recipientSelectMethod === "manual" &&
      !session.recipient
    ) {
      setShowForm(true)
    }
  }, [portlet, session])

  const showContactInfo = !showForm && !!session?.recipient
  const showContextChip = portlet?.recipientSelectMethod === "context"
  const showChangeButton = session?.stage === "draft" && portlet?.recipientSelectMethod === "manual"

  return (
    <PanelBox title="Recipient">
      {sessionQuery.isLoading ? (
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-1/2 rounded-full" />
          <Skeleton className="h-4 w-1/4 rounded-full" />
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {/* FORM */}
          {showForm ? <RecipientForm {...props} onAfterSave={() => setShowForm(false)} /> : null}
          {/* CONTACT INFO */}
          {showContactInfo ? (
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <p className="text font-medium">{session?.recipient?.name}</p>
                <p className="text-sm text-default-500">{session?.recipient?.email}</p>
                {session?.recipient?.phoneNumber ? (
                  <p className="text-sm text-default-500"> {session?.recipient?.phoneNumber} </p>
                ) : null}
              </div>
              {showChangeButton ? (
                <Button
                  color="primary"
                  variant="flat"
                  className="mt-1"
                  onPress={() => setShowForm(true)}
                >
                  Change
                </Button>
              ) : null}
            </div>
          ) : null}
          {/* CONTEXT CHIP */}
          {showContextChip ? (
            <Chip variant="dot" color="primary" size="sm">
              Recipient comes from <span className="font-semibold text-default-500">context</span>
            </Chip>
          ) : null}
        </div>
      )}
    </PanelBox>
  )
}
