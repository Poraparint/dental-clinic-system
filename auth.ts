import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { CompanyRole } from "@prisma/client";

//manager
import { getManagerById } from "@/data/manager";
import { getAccountByManagerId } from "@/data/account";

//member
import { getMemberById } from "@/data/member";

//2FA
import {
  getTwoFactorConfirmationByManagerId,
  getTwoFactorConfirmationByMemberId,
} from "@/data/two-factor-confirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //อนุญาตให้ OAuth ล็อกอินโดยไม่ต้องยืนยันอีเมล
      if (account?.provider !== "credentials") return true;

      // ถ้าไม่มี user.id ให้ปฏิเสธการล็อกอิน
      if (!user.id) return false;

      const existingManager = await getManagerById(user.id);
      const existingMember = await getMemberById(user.id);

      const CompanyAccess = existingManager || existingMember;

      // ป้องกันการล็อกอินหากยังไม่ยืนยันอีเมล
      if (!existingManager?.emailVerified) return false;

      if (!CompanyAccess) return false;

      // ตรวจสอบ 2FA
      if (CompanyAccess.isTwoFactorEnabled) {
        if (existingManager) {
          const twoFactorConfirmation =
            await getTwoFactorConfirmationByManagerId(CompanyAccess.id);

          if (!twoFactorConfirmation) return false;

          // ลบ confirmation เพื่อใช้ในครั้งต่อไป
          await db.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });
        } else if (existingMember) {
          const twoFactorConfirmation =
            await getTwoFactorConfirmationByMemberId(CompanyAccess.id);

          if (!twoFactorConfirmation) return false;

          // ลบ confirmation เพื่อใช้ในครั้งต่อไป
          await db.memberTwoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      if (session.user) {
        session.user.role = token.role as CompanyRole;
      }

      return session;
    },

    async jwt({ token }) {
      //ไม่มี id = logout
      if (!token.sub) return token;

      const existingManager = await getManagerById(token.sub);
      const existingMember = await getMemberById(token.sub);

      const CompanyAccess = existingManager || existingMember;

      if (!CompanyAccess) return token;

      const existingAccount = await getAccountByManagerId(existingManager.id);

      token.isOAuth = !!existingAccount;
      token.name = CompanyAccess.name;
      token.email = CompanyAccess.email;
      token.isTwoFactorEnabled = CompanyAccess.isTwoFactorEnabled;

      if (existingManager) {
        token.role = CompanyRole.MANAGER;
      } else if (existingMember) {
        token.role = existingMember.role;
      } else {
        token.role = CompanyRole.PENDING;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
