"use server"

import { ValidatedPortletSession } from "~sml-app-kit/modules/portlets/schema/portlets.types"
import PrismaEnhanced from "~sml-app-kit/services/prisma/PrismaEnhanced"

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
  const { db } = new PrismaEnhanced()

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
