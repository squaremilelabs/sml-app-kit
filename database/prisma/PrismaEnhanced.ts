import { enhance, EnhancementContext } from "@zenstackhq/runtime"
import { User } from "@prisma/client"
import prisma from "."

export default class PrismaEnhanced {
  db: ReturnType<typeof enhance<typeof prisma>>
  constructor(context?: EnhancementContext<User>) {
    this.db = enhance(prisma, context)
  }
}
