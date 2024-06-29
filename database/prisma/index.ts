import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool as NeonPool } from "@neondatabase/serverless"

const neon = new NeonPool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(neon)
const prismaGlobal = () => new PrismaClient({ adapter })

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaGlobal>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaGlobal()

export default prisma

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma
}
