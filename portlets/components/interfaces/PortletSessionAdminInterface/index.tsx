"use client"

import { useMemo } from "react"
import RecipientBox from "./parts/AdminPanel/parts/RecipientBox"
import AdminPanel from "./parts/AdminPanel"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"

export default function PortletSessionAdminInterface({
  portletSessionId,
}: {
  portletSessionId: string
}) {
  return (
    <main className="w-full">
      <section className="w-7/12">
        <AdminPanel portletSessionId={portletSessionId} />
      </section>
    </main>
  )
}
