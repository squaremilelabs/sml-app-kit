import React from "react"
import PortletRegistry from "./functions/PortletRegistry"
import { z } from "zod"
import { PortletSessionRecipientSchema } from "./schemas"

export type PortletRecipientSelectMethod = "manual" | "context"

export type Portlet = {
  id: string
  slug: string
  title: string
  recipientSelectMethod: PortletRecipientSelectMethod
  sessionLifeMinutes: number
  requiresAuth: boolean
  isDisabled: boolean
  PortletComponent: React.FunctionComponent<PortletComponentProps>
  PortletControlComponent: React.FunctionComponent<PortletComponentProps>
}

export type PortletComponentViewerType = "admin" | "recipient"

export type PortletSessionContext = {
  portletRegistry: PortletRegistry
  portletId: string
  sessionId: string
}

export type PortletComponentProps = PortletSessionContext & {
  viewerType: PortletComponentViewerType
}

export type PortletDeliveryMethod = "email" | "sms" | "link"

export type PortletSessionRecipient = z.infer<typeof PortletSessionRecipientSchema>

export type PortletSesssionStage = "draft" | "active" | "final" | "discarded"
export type PortletSessionDiscardType = "expiry" | "manual"

export type BasePortletSessionData = {
  context: Record<string, unknown>
  inputs: Record<string, unknown>
  finals: Record<string, unknown> | null
}

type BasePortletSession<D extends BasePortletSessionData> = {
  id: string
  stage: PortletSesssionStage
  portletId: string
  portletTitle: string
  recipient: PortletSessionRecipient | null
  deliveryMethod: PortletDeliveryMethod | null
  deliveryMessage: string | null
  createdUTC: number
  activatedUTC: number | null
  expiryUTC: number | null
  lastUpdatedUTC: number | null
  lastViewedUTC: number | null
  discardedUTC: number | null
  isCurrentlyViewing: boolean
  discardType: PortletSessionDiscardType | null
  data: D
}

type PortletSessionDraft<D extends BasePortletSessionData> = BasePortletSession<D> & {
  stage: "draft" & PortletSesssionStage
}

type PortletSessionActive<D extends BasePortletSessionData> = BasePortletSession<D> & {
  stage: "active" & PortletSesssionStage
  activatedUTC: number
  expiryUTC: number
}

type PortletSessionFinal<D extends BasePortletSessionData> = BasePortletSession<D> & {
  stage: "final" & PortletSesssionStage
  activatedUTC: number
  expiryUTC: number
}

type PortletSessionDiscarded<D extends BasePortletSessionData> = BasePortletSession<D> & {
  stage: "discarded" & PortletSesssionStage
  discardedUTC: number
  discardType: PortletSessionDiscardType
}

export type PortletSession<D extends BasePortletSessionData> =
  | PortletSessionDraft<D>
  | PortletSessionActive<D>
  | PortletSessionFinal<D>
  | PortletSessionDiscarded<D>
