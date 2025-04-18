import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user" | undefined] & {
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  role: string;
  companies?: string[];
  companyId: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
