import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"
import { PortletComponentProps } from "~sml-app-kit/portlets/types"

export default function RecipientInfo(props: PortletComponentProps) {
  const { portletRegistry, portletId, sessionId } = props
  const portlet = portletRegistry.getPortlet(portletId)
  const sessionQuery = usePortletSessionQuery({ portletRegistry, portletId, sessionId })
  const session = sessionQuery?.data

  if (!session?.recipient) {
    return <p className="text-sm text-default-500">No recipient</p>
  }

  return (
    <div className="flex flex-col space-y-2">
      <p>{session.recipient.name}</p>
    </div>
  )
}
