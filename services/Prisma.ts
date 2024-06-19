import { PrismaClient } from "@prisma/client"
import { EnhancementContext, enhance } from "@zenstackhq/runtime"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default class Prisma {
  db: ReturnType<typeof enhance<PrismaClient>>
  constructor(context?: EnhancementContext) {
    this.db = enhance(prisma, context)
  }
}

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma
}
