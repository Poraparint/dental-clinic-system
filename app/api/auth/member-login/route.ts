import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { MEMBER_LOGIN_REDIRECT } from "@/routes";

//schema
import { MemberLoginSchema } from "@/schemas";

//lib
import {
  generateVerificationToken,
  generateTwoFacterToken,
} from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";

//data
import {
  getMemberByUserEmail,
} from "@/data/external/user";
import { getTwoFactorTokenByEmail } from "@/data/external/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/external/two-factor-confirmation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const values = await request.json();

  const validation = MemberLoginSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { email, password, code, memberCode } = validation.data;
  const existingUser = await getMemberByUserEmail(email);

  if (
    !existingUser ||
    !existingUser.email ||
    !existingUser.password 
  ) {
    return NextResponse.json({ error: "ไม่มีอีเมลนี้ในระบบ" }, { status: 404 });
  }
    
  if (
    !existingUser.member ||
    !existingUser.member.companyId ||
    !existingUser.member.memberCode ||
    existingUser.member?.isDeleted === true
  ) {
    return NextResponse.json(
      { error: "ไม่มีข้อมูลอีเมลนี้ในบริษัทหรือถูกหยุดหารทำงานไปแล้ว" },
      { status: 403 }
    );
  }

  if (memberCode !== existingUser.member.memberCode) {
    return NextResponse.json(
      { error: "รหัสพนักงานไม่ถูกต้อง" },
      { status: 403 }
    );
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json({ success: "ระบบได้ส่งอีเมลยืนยันให้คุณแล้ว!" });
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return NextResponse.json({ error: "รหัสหมดอายุ" }, { status: 401 });
      }

      if (twoFactorToken.token !== code) {
        return NextResponse.json({ error: "รหัสไม่ตรง" }, { status: 402 });
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return NextResponse.json(
          { error: "รหัสยืนยันไม่ถูกต้องหรือหมดอายุ" },
          { status: 401 }
        );
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFacterToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return NextResponse.json({ twoFactor: true });
    }
  }
    
  const companyId = existingUser.member?.companyId;

  if (!companyId) {
    return NextResponse.json(
      { error: "ไม่พบข้อมูลบริษัทของสมาชิกนี้" },
      { status: 400 }
    );
  }
  const callbackUrl =
    values.callbackUrl || `/${companyId}${MEMBER_LOGIN_REDIRECT}`;

  try {
    await signIn("credentials", {
      email,
        password,
      redirect: false,
    });

    return NextResponse.json({ url: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดบางอย่าง" },
      { status: 500 }
    );
  }
}
