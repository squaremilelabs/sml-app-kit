import { enhance } from "@zenstackhq/runtime"
import prisma from "."

type EnhancementContext = Parameters<typeof enhance>[1]
type EnhancementOptions = Parameters<typeof enhance>[2]

export default class PrismaEnhanced {
  db: ReturnType<typeof enhance<typeof prisma>>
  constructor(context?: EnhancementContext, options?: EnhancementOptions) {
    this.db = enhance(prisma, context, options)
  }
}
