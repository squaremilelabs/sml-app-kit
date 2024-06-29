"use server"

import { ExpandedValidatedPortletSession } from "~sml-app-kit/modules/portlets/schema/portlets.types"
import PrismaEnhanced from "~sml-app-kit/services/prisma/PrismaEnhanced"

interface GetPortletSessionInput {
  portletSessionId: string
}

export default async function getPortletSession(
  input: GetPortletSessionInput
): Promise<ExpandedValidatedPortletSession> {
  // TODO: implement auth
  const { db } = new PrismaEnhanced()

  const session = await db.portletSession.findUniqueOrThrow({
    where: { id: input.portletSessionId },
    include: {
      portlet: true,
      state: true,
    },
  })

  return session as ExpandedValidatedPortletSession
}
