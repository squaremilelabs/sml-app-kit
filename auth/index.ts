import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "../database/prisma"
import smlConfig from "sml.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: smlConfig?.auth?.providers ?? [],
})
