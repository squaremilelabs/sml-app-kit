import portletConfig from "portlets.config"
import Prisma from "~sml-app-kit/services/Prisma"

async function migratePortlets() {
  const { db } = new Prisma()
  await db.portlet.createMany({
    data: portletConfig.map(({ components, ...input }) => input),
  })
}

migratePortlets().then(console.log).catch(console.error)
