import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";

//lib
import { getUserByEmail } from "@/data/external/user";
import { getPasswordResetTokenByToken } from "@/data/external/password-reset-token";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "ไม่พบโทเคน", description: "ลิงก์ไม่ถูกต้องหรือหมดอายุ" },
      { status: 400 }
    );
  }
  const values = await request.json();

  const validation = NewPasswordSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { password } = validation.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return NextResponse.json(
      { error: "โทเคนไม่ถูกต้อง", description: "ลิงก์ไม่ถูกต้องหรือหมดอายุ" },
      { status: 400 }
    );
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return NextResponse.json(
      {
        error: "โทเคนหมดอายุ",
        description: "กรุณาขอเปลี่ยนรหัสผ่านใหม่อีกครั้ง",
      },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return NextResponse.json(
      { error: "ไม่พบผู้ใช้งาน", description: "อีเมลไม่ตรงกับบัญชีใดๆ" },
      { status: 404 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
      
    return NextResponse.json(
      {
        success: "เปลี่ยนรหัสผ่านสำเร็จ",
        description: "คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้แล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[NEW_PASSWORD_ERROR]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเปลี่ยนรหัสผ่านได้ โปรดลองใหม่ภายหลัง",
      },
      { status: 500 }
    );
  }
}
