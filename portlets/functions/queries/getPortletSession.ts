import {
  BasePortletSessionData,
  PortletSession,
  PortletSessionContext,
} from "~sml-app-kit/portlets/types"

export default async function getPortletSession<D extends BasePortletSessionData>(
  context: PortletSessionContext
): Promise<PortletSession<D> | null> {
  const { portletId, sessionId, portletRegistry } = context
  const portlet = portletRegistry.getPortlet(portletId)
  if (!portlet) return null

  // TODO: fetch the session
  const session: PortletSession<D> = {
    id: sessionId,
    stage: "draft",
    portletId: portlet.id,
    portletTitle: portlet.title,
    recipient: {
      name: "Eleazar Ramos",
      email: "e@squaremilelabs.com",
      phoneNumber: null,
    },
    deliveryMethod: null,
    deliveryMessage: null,
    createdUTC: new Date().getUTCMilliseconds(),
    activatedUTC: null,
    expiryUTC: null,
    lastUpdatedUTC: null,
    lastViewedUTC: null,
    discardedUTC: null,
    isCurrentlyViewing: false,
    discardType: null,
    data: {
      context: {},
      inputs: {},
      finals: null,
    } as D,
  }

  return session
}
