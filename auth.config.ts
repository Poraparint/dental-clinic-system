import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas";
import { getManagerByEmail } from "@/data/manager";
import { getMemberByEmail } from "@/data/member";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google OAuth environment variables are not set");
}

export default {
  providers: [
    
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error("Invalid credentials format");
        }
        const { email, password } = validatedFields.data;
        try {
          const manager = await getManagerByEmail(email);
          if (manager && manager.password) {
            const passwordMatch = await bcrypt.compare(password, manager.password);
            if (passwordMatch) {
              return { ...manager, userType: "manager" };
            }
          }

          const member = await getMemberByEmail(email);
          if (member && member.password) {
            const passwordMatch = await bcrypt.compare(password, member.password);
            if (passwordMatch) {
              return { ...member, userType: "member" };
            }
          }
          
        } catch (error){
          console.error("Error during authorization:", error);
          throw new Error("An error occurred during authorization");
        }
        return null;
        
      },
    }),
  ],
} satisfies NextAuthConfig;
