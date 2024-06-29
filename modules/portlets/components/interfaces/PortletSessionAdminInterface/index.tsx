"use client"
import { Skeleton } from "@nextui-org/react"
import RecipientPanel from "./parts/RecipientPanel"
import PortletPanel from "./parts/PortletPanel"
import usePortletSessionQuery from "~sml-app-kit/modules/portlets/hooks/usePortletSessionQuery"

export default function PortletSessionAdminInterface({
  portletSessionId,
}: {
  portletSessionId: string
}) {
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data
  return (
    <main className="flex h-full w-full flex-wrap overflow-auto @container">
      {/* CONTROLS SECTION */}
      <section className="flex w-full justify-center @wmd:w-1/2">
        <div className="flex w-full max-w-wmd flex-col space-y-2">
          {/* HEADER */}
          <div className="sticky top-0 z-50 flex shrink-0 flex-col bg-background/30 p-4 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold">Configure Portlet</h2>
            </div>
            {portletSessionQuery.isLoading ? (
              <Skeleton className="h-7 w-1/4 rounded-full" />
            ) : (
              <h1 className="text-balance text-xl font-bold text-primary">
                {portletSession?.portlet.title}
              </h1>
            )}
          </div>
          {/* CONTENT */}
          <div className="grow space-y-4 p-4 pt-0">
            <RecipientPanel portletSessionId={portletSessionId} />
          </div>
        </div>
      </section>
      {/* PORTLET SECTION */}
      <section className="sticky top-0 flex h-screen w-full justify-center p-4 @wmd:w-1/2">
        <div className="w-full max-w-wmd">
          <PortletPanel portletSessionId={portletSessionId} />
        </div>
      </section>
    </main>
  )
}
