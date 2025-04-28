"use server";

//database
import { db } from "@/lib/db";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { MemberRegisterSchema, RegisterSchema } from "@/schemas";

//lib
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { CompanyRole } from "@prisma/client";
import { getUserByEmail } from "@/data/external/user";
import { currentManager } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await db.manager.create({
      data: {
        id: user.id,
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


export const MemberRegister = async (values: z.infer<typeof MemberRegisterSchema>, companyId:string) => {
  const existingManager = await currentManager();

  if (!existingManager) {
    console.log(`Manager with ID ${existingManager} not found`);
    return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
  }

  const existingCompany = await getCompanyById(companyId);

  if (!existingCompany) {
    return { error: "ไม่พบบริษัทที่อยู่นี้" };
  }

  const validateFields = MemberRegisterSchema.safeParse(values);


  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, phone, memberCode, role } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });

    await db.member.create({
      data: {
        id: user.id,
        memberCode,
        companyId,
        role,
        managerId: existingManager.id,
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
