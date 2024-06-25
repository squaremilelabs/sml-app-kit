import { Chip, ChipProps } from "@nextui-org/react"
import { PortletSessionStage } from "@prisma/client"
import { ValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"

const chipPropsMap: Record<PortletSessionStage | "PLACEHOLDER", ChipProps> = {
  PLACEHOLDER: {
    color: "default",
    children: "...",
  },
  draft: {
    color: "default",
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
  portletSession: ValidatedPortletSession | undefined
} & ChipProps) {
  const stageChipProps = chipPropsMap[portletSession?.stage ?? "PLACEHOLDER"]
  return <Chip {...stageChipProps} {...chipProps} />
}
