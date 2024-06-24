import { Skeleton } from "@nextui-org/react"
import { useMemo } from "react"
import PortletSessionStageChip from "~sml-app-kit/portlets/components/portables/PortletSessionStageChip"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"

export default function Header({ portletSessionId }: { portletSessionId: string }) {
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <h2 className="font-semibold">Portlet</h2>
        {portletSession ? (
          <PortletSessionStageChip portletSession={portletSession} size="sm" />
        ) : null}
      </div>
      {portletSessionQuery.isLoading ? (
        <Skeleton className="h-7 w-1/2 rounded-full" />
      ) : (
        <h1 className="text-balance text-xl font-bold text-primary">
          {portletSession?.portlet.title}
        </h1>
      )}
    </div>
  )
}
