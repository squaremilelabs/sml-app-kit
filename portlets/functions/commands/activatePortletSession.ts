"use server"

import SMLError from "~sml-app-kit/errors/SMLError"
import { ValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"
import Prisma from "~sml-app-kit/services/Prisma"

export type ActivatePortletSessionInput = {
  portletSessionId: string
  expiryMinutes?: number
}

export default async function activatePortletSession(
  input: ActivatePortletSessionInput
): Promise<ValidatedPortletSession> {
  // TODO: implement auth
  const { db } = new Prisma()

  const initialSession = await db.portletSession.findUnique({
    where: { id: input.portletSessionId },
    include: { portlet: true },
  })

  if (!initialSession) {
    throw new SMLError({ message: "Session does not exist" })
  }

  const activatedUTC = new Date().getTime()
  const expiryMinutes = input.expiryMinutes ?? initialSession.portlet.defaultExpiryMinutes
  const expiryUTC = activatedUTC + expiryMinutes * 60_000

  const session = await db.portletSession.update({
    where: { id: input.portletSessionId },
    data: {
      stage: "active",
      activatedUTC,
      expiryUTC,
    },
  })

  return session as ValidatedPortletSession
}
