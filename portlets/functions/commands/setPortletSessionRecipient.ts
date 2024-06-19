"use server"

import { ValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"
import Prisma from "~sml-app-kit/services/Prisma"

export interface SetPortletSessionRecipientInput {
  portletSessionId: string
  recipientName: string
  recipientEmail: string
  recipientPhoneNumber?: string | null
}

export default async function setPortletSessionRecipient(
  input: SetPortletSessionRecipientInput
): Promise<ValidatedPortletSession> {
  // TODO: implement auth
  const { db } = new Prisma()

  const session = await db.portletSession.update({
    where: { id: input.portletSessionId },
    data: {
      recipientName: input.recipientName,
      recipientEmail: input.recipientEmail,
      recipientPhoneNumber: input.recipientPhoneNumber,
    },
  })

  return session as ValidatedPortletSession
}
