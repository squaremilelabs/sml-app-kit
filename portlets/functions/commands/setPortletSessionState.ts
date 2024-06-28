import { ExpandedValidatedPortletSession } from "~sml-app-kit/portlets/schema/portlets.types"
import Prisma from "~sml-app-kit/services/Prisma"

export type SetPortletSessionStateInput = {
  portletSessionId: string
  controls?: object
  inputs?: object
  setIsAbleToFinalize?: boolean
  setIsAbleToActivate?: boolean
}

export default async function setPortletSessionState(
  input: SetPortletSessionStateInput
): Promise<ExpandedValidatedPortletSession> {
  // TODO: implement auth
  const { db } = new Prisma()

  db.$transaction(async (txn) => {
    /** Update state */
    if (input.controls || input.inputs) {
      await txn.portletSessionState.update({
        where: { sessionId: input.portletSessionId },
        data: {
          inputs: input.inputs,
          controls: input.controls,
        },
      })
    }
    /** Update session */
    if (
      typeof input.setIsAbleToActivate === "boolean" ||
      typeof input.setIsAbleToFinalize === "boolean"
    ) {
      await txn.portletSession.update({
        where: { id: input.portletSessionId },
        data: {
          isAbleToActivate: input.setIsAbleToActivate,
          isAbleToFinalize: input.setIsAbleToFinalize,
        },
      })
    }
  })

  const session = await db.portletSession.findUnique({
    where: { id: input.portletSessionId },
    include: {
      portlet: true,
      state: true,
    },
  })

  return session as ExpandedValidatedPortletSession
}
