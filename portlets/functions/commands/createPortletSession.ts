"use server"

import { ValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"
import Prisma from "~sml-app-kit/services/Prisma"
import SMLError from "~sml-app-kit/errors/SMLError"

export type CreatePortletSessionInput = {
  portletId: string
}

export default async function createPortletSession(
  input: CreatePortletSessionInput
): Promise<ValidatedPortletSession> {
  // TODO: implement auth
  const { db } = new Prisma()

  const portlet = await db.portlet.findUnique({ where: { id: input.portletId } })

  if (!portlet) {
    throw new SMLError({ message: "Portlet does not exist" })
  }

  const session = await db.portletSession.create({
    data: {
      portletId: portlet.id,
      createdUTC: Math.floor(new Date().getTime() / 1_000),
      state: {
        create: {
          controls: {},
          inputs: {},
        },
      },
    },
  })

  return session as ValidatedPortletSession
}
