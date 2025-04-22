import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { CompanyRole } from "@prisma/client";

//manager
import { getManagerById } from "@/data/manager";

//member
import { getMemberById } from "@/data/member";


//2FA
import { verifyTwoFactorConfirmation } from "@/lib/verify";
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

      const [existingManager, existingMember] = await Promise.all([
        getManagerById(user.id),
        getMemberById(user.id),
      ]);

      if (!existingManager && !existingMember) return false;

      // ป้องกันการล็อกอินหากยังไม่ยืนยันอีเมล
      if (existingManager && !existingManager.emailVerified) return false;
      if (existingMember && !existingMember.emailVerified) return false;

      // ตรวจสอบ 2FA
      if (
        existingManager?.isTwoFactorEnabled ||
        existingMember?.isTwoFactorEnabled
      ) {
        if (
          existingManager &&
          !(await verifyTwoFactorConfirmation(existingManager.id, "manager"))
        ) {
          return false;
        }
        if (
          existingMember &&
          !(await verifyTwoFactorConfirmation(existingMember.id, "member"))
        ) {
          return false;
        }
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as CompanyRole;


        if (token.userType === "manager") {
          session.user.companies = token.companies || []; 
        } else if (token.userType === "member") {
          session.user.companyId = token.companyId || null;
        }
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      //ไม่มี id = logout
      if (!token.sub) return token;
      try {
        const [existingManager, existingMember] = await Promise.all([
          getManagerById(token.sub),
          getMemberById(token.sub),
        ]);

        const user = existingManager || existingMember;
        if (!user) return token;

        token.name = user.name;
        token.email = user.email;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled;

        if (existingManager) {
          token.userType = "manager";
          token.role = CompanyRole.MANAGER;
          token.companies = existingManager.companies.map((c) => c.id);
        } else if (existingMember) {
          token.userType = "member";
          token.companyId = existingMember.companyId;
          token.role = existingMember.role;
        }
        
      } catch (error) {
        console.error(`Error fetching user data for user ID ${token.id}:`, error);
        return token;
      }
      

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
