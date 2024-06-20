import { Portlet } from "@prisma/client"
import React from "react"

type PortletConfig = Array<
  Portlet & {
    componentMap: {
      PortletComponent: React.FC<{ portletSessionId: string; viewer: "admin" | "recipient" }>
      PortletControlComponent: React.FC<{ portletSessionId: string }>
    }
  }
>

const portletConfig: PortletConfig = []

export default PortletConfig
