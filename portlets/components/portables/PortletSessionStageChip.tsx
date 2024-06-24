import { Chip, ChipProps } from "@nextui-org/react"
import { PortletSessionStage } from "@prisma/client"
import { ValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"

const chipPropsMap: Record<PortletSessionStage, ChipProps> = {
  draft: {
    color: "warning",
    children: "Draft",
  },
  active: {
    color: "secondary",
    children: "Active",
  },
  final: {
    color: "success",
    children: "Final",
  },
  discarded: {
    color: "danger",
    children: "Discarded",
  },
}

export default function PortletSessionStageChip({
  portletSession,
  ...chipProps
}: {
  portletSession: ValidatedPortletSession
} & ChipProps) {
  const { stage } = portletSession
  const stageChipProps = chipPropsMap[stage]

  return <Chip variant="dot" {...stageChipProps} {...chipProps} />
}
