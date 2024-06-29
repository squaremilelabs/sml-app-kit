import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import prisma from "../database/prisma"

const authConfigPath = "auth.config"
const authConfig = import(authConfigPath).then((config) => config).catch(() => {}) as {
  providers?: NextAuthConfig["providers"]
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: authConfig?.providers ?? [],
})
