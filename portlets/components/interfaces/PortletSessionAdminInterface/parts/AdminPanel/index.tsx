import { useQueryClient } from "@tanstack/react-query"
import Header from "./parts/Header"
import RecipientBox from "./parts/RecipientBox"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"
import Box from "~sml-app-kit/smui/components/Box"

export default function AdminPanel({ portletSessionId }: { portletSessionId: string }) {
  const queryClient = useQueryClient()
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data

  return (
    <div className="flex h-full w-full flex-col space-y-2">
      {/* HEADER */}
      <div className="shrink-0 p-4 pb-0">
        <Header portletSessionId={portletSessionId} />
      </div>
      {/* BODY */}
      <div className="grow space-y-4 overflow-auto p-4">
        <Box title="Controls">
          <div />
        </Box>
        <RecipientBox portletSessionId={portletSessionId} />
      </div>
      {/* FOOTER */}
      <div className="shrink-0 p-4 pt-0"></div>
    </div>
  )
}
