"use server"

import { ExpandedValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"
import Prisma from "~sml-app-kit/services/Prisma"

interface GetPortletSessionInput {
  portletSessionId: string
}

export default async function getPortletSession(
  input: GetPortletSessionInput
): Promise<ExpandedValidatedPortletSession> {
  // TODO: implement auth
  const { db } = new Prisma()

  const session = await db.portletSession.findUniqueOrThrow({
    where: { id: input.portletSessionId },
    include: {
      portlet: true,
      state: true,
    },
  })

  return session as ExpandedValidatedPortletSession
}
