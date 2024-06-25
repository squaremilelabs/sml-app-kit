"use client"
import { Button, ButtonGroup, Chip } from "@nextui-org/react"
import PortletSessionStageChip from "../../portables/PortletSessionStageChip"
import AdminPanel from "./parts/AdminPanel"
import Box from "~sml-app-kit/smui/components/Box"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"

export default function PortletSessionAdminInterface({
  portletSessionId,
}: {
  portletSessionId: string
}) {
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data
  return (
    <main className="flex h-full w-full flex-wrap overflow-auto @container">
      <section className="w-full @wmd:w-1/2 @wlg:w-7/12">
        <AdminPanel portletSessionId={portletSessionId} />
      </section>
      <section className="sticky top-0 max-h-screen w-full p-4 @wmd:h-full @wmd:w-1/2 @wlg:w-5/12">
        <Box
          topContent={
            <div className="flex items-center space-x-2">
              {!!portletSession && (
                <PortletSessionStageChip
                  portletSession={portletSession}
                  variant="flat"
                  radius="sm"
                />
              )}
              <span className="text-sm text-default-500">Created 43 minutes ago</span>
            </div>
          }
          bottomContent={
            <div className="flex justify-end">
              <Button color="primary">Send</Button>
            </div>
          }
          classNames={{
            baseWrapper: "h-full",
            mainContentWrapper: "overflow-auto grow",
          }}
        >
          <div className="h-[1000px]">Test</div>
        </Box>
      </section>
    </main>
  )
}
