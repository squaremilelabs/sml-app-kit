import { Portlet } from "../types"

export default class PortletRegistry {
  private portlets: Portlet[]

  constructor(portlets: Portlet[]) {
    this.portlets = portlets
  }

  getPortlet(portletId: string) {
    return this.portlets.find((p) => p.id === portletId)
  }

  getAllPortlets() {
    return this.portlets
  }

  getActivePortlets() {
    return this.portlets.filter((p) => !p.isDisabled)
  }
}
