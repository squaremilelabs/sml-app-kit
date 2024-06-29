import portletConfig from "portlets.config"
import Prisma from "~sml-app-kit/services/Prisma"

async function migratePortlets() {
  const { db } = new Prisma()
  const promises = portletConfig.map(({ components, ...portlet }) => {
    const promiseToRun = async () => {
      await db.portlet.upsert({
        where: { key: portlet.key },
        create: portlet,
        update: portlet,
      })
    }
    return promiseToRun()
  })
  await Promise.all(promises)
}

migratePortlets().then(console.log).catch(console.error)
