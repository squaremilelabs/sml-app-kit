import { PortletSession, PortletSessionDiscardType } from "@prisma/client"

interface ValidatedPortletSessionDraft extends PortletSession {
  stage: "draft"
  activatedUTC: null
  expiryUTC: null
  finalizedUTC: null
  discardedUTC: null
  discardType: null
}

interface ValidatedPortletSessionActive extends PortletSession {
  stage: "active"
  recipientName: string
  recipientEmail: string
  activatedUTC: number
  expiryUTC: number
  finalizedUTC: null
  discardedUTC: null
  discardType: null
}

interface ValidatedPortletSessionFinal extends PortletSession {
  stage: "final"
  recipientName: string
  recipientEmail: string
  activatedUTC: number
  expiryUTC: number
  finalizedUTC: number
  discardedUTC: null
  discardType: null
}

interface ValidatedPortletSessionDiscarded extends PortletSession {
  stage: "discarded"
  discardedUTC: number
  discardType: PortletSessionDiscardType
}

export type ValidatedPortletSession =
  | ValidatedPortletSessionDraft
  | ValidatedPortletSessionActive
  | ValidatedPortletSessionFinal
  | ValidatedPortletSessionDiscarded
