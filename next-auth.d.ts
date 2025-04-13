import { CompanyRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user" | undefined] & {
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  role: CompanyRole
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
