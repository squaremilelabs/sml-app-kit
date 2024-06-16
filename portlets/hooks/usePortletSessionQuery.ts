import { useQuery } from "@tanstack/react-query"
import { BasePortletSessionData, PortletSessionContext } from "../types"
import getPortletSession from "../functions/queries/getPortletSession"

export default function usePortletSessionQuery<D extends BasePortletSessionData>(
  context: PortletSessionContext
) {
  return useQuery({
    queryKey: [context.portletId, context.sessionId],
    queryFn: async () => getPortletSession<D>(context),
  })
}
