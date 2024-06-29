import { PortletCreateSchema } from "@zenstackhq/runtime/zod/models"
import React from "react"
import { z } from "zod"

export type PortletConfig = Array<
  z.infer<typeof PortletCreateSchema> & {
    components: {
      PortletComponent: React.FC<{ portletSessionId: string; viewer: "admin" | "recipient" }>
      PortletControlComponent: React.FC<{ portletSessionId: string }>
    }
  }
>
