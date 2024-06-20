import { Portlet } from "@prisma/client"
import React from "react"
import { PortletCreateSchema } from "@zenstackhq/runtime/zod/models"
import { z } from "zod"

type PortletConfig = Array<
  z.infer<typeof PortletCreateSchema> & {
    componentMap: {
      PortletComponent: React.FC<{ portletSessionId: string; viewer: "admin" | "recipient" }>
      PortletControlComponent: React.FC<{ portletSessionId: string }>
    }
  }
>

const portletConfig: PortletConfig = []

export default PortletConfig
