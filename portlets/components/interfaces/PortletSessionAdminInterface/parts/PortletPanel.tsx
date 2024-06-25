import { Button, Skeleton } from "@nextui-org/react"
import SendActions from "./SendActions"
import PortletSessionStageChip from "~sml-app-kit/portlets/components/portables/PortletSessionStageChip"
import usePortletSessionQuery from "~sml-app-kit/portlets/hooks/usePortletSessionQuery"
import { ExpandedValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"
import Panel from "~sml-app-kit/smui/components/Panel"

export default function PortletPanel({ portletSessionId }: { portletSessionId: string }) {
  const portletSessionQuery = usePortletSessionQuery(portletSessionId)
  const portletSession = portletSessionQuery.data

  return (
    <Panel
      classNames={{
        baseWrapper: "h-full",
        mainContentWrapper: "overflow-auto grow",
      }}
      topContent={<TopContent portletSession={portletSession} />}
      bottomContent={<BottomContent portletSession={portletSession} />}
    >
      <div className="h-[1000px]" />
    </Panel>
  )
}

function TopContent({
  portletSession,
}: {
  portletSession: ExpandedValidatedPortletSession | undefined
}) {
  return (
    <div className="flex items-center space-x-2">
      <PortletSessionStageChip portletSession={portletSession} variant="flat" radius="sm" />
      <span className="text-sm text-default-500">Created 43 minutes ago</span>
    </div>
  )
}

function BottomContent({
  portletSession,
}: {
  portletSession: ExpandedValidatedPortletSession | undefined
}) {
  return (
    <div className="flex justify-stretch">
      {portletSession ? (
        <SendActions portletSessionId={portletSession.id} />
      ) : (
        <div className="h-10" />
      )}
    </div>
  )
}
