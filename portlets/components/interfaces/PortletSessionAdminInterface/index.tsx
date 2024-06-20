"use client"

import { useMemo } from "react"
import RecipientBox from "./parts/RecipientBox"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"

export default function PortletSessionAdminInterface({
  portletSessionId,
}: {
  portletSessionId: string
}) {
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  return (
    <div className="w-wmd max-w-full">
      <RecipientBox portletSessionId={portletSessionId} />
    </div>
  )
}
