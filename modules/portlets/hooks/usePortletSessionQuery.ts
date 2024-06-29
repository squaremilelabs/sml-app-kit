import { useQuery } from "@tanstack/react-query"
import { ExpandedValidatedPortletSession } from "../schema/portlets.types"
import getPortletSession from "../functions/queries/getPortletSession"

export default function usePortletSessionQuery(portletSessionId: string) {
  return useQuery<ExpandedValidatedPortletSession>({
    queryKey: ["portletSession", portletSessionId],
    queryFn: async () => {
      return getPortletSession({ portletSessionId })
    },
  })
}
