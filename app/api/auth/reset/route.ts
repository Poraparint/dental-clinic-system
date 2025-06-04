import { getUserByEmail } from "@/data/external/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const values = await request.json();

  const validation = ResetSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }
  const { email } = validation.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return NextResponse.json(
      { error: "ไม่พบผู้ใช้งาน", description: "อีเมลไม่ตรงกับบัญชีใดๆ" },
      { status: 404 }
    );
  }

  try {
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } catch (error) {
    console.error("[RESET_ERROR]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการรีเซตรหัสผ่าน",
        description: "กรุณาลองใหม่อีกครั้งในภายหลัง",
      },
      { status: 500 }
    );
  }
}
