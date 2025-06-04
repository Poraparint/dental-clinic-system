import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

//lib
import { getUserByEmail } from "@/data/external/user";
import { getVerificationTokenByToken } from "@/data/external/verification-token";

export async function POST(request: NextRequest) {
    const { token } = await request.json();

  if (!token) {
    return NextResponse.json(
      { error: "ไม่พบโทเคน", description: "ลิงก์ไม่ถูกต้องหรือหมดอายุ" },
      { status: 400 }
    );
  }

  const existingToken = await getVerificationTokenByToken(token);

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
    

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
      
    return NextResponse.json(
      {
        success: "ยืนยันอีเมลสำเร็จ",
        description: "คุณสามารถเข้าสู่ระบบได้แล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[NEW_VERIFICATION_ERROR]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเปลี่ยนรหัสผ่านได้ โปรดลองใหม่ภายหลัง",
      },
      { status: 500 }
    );
  }
}
