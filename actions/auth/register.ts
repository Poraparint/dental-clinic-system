"use server";

//database
import { db } from "@/lib/db";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/manager";

//lib
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { CompanyRole } from "@prisma/client";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, username, companyname } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    return await db.$transaction(async (db) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.user.create({
        data: {
          name: username,
          email,
          password: hashedPassword,
        },
      });

      await db.company.create({
        data: {
          name: companyname,
          userId: user.id,
          members: {
            create: {
              userId: user.id,
              role: CompanyRole.CEO,
            },
          },
        },
        include: {
          members: true,
        },
      });

      //Send verification token email
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return {
        success: "Registration successfull! Confirmation email sent.",
      };
    });
  } catch {
    return { error: "An error occurred during registration" };
  }
};
