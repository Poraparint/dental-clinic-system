"use server";

//database
import { db } from "@/lib/db";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getManagerByEmail } from "@/data/manager";

//lib
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { CompanyRole } from "@prisma/client";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validateFields.data;

  const existingUser = await getManagerByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: CompanyRole.MANAGER,
      },
    });

    // Send verification token email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "Registration successful! Confirmation email sent.",
    };
  } catch {
    return { error: "An error occurred during registration" };
  }
};
