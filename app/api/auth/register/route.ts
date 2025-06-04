import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

import bcrypt from "bcryptjs";

import {  RegisterSchema } from "@/schemas";

//lib
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { CompanyRole } from "@prisma/client";
import { getUserByEmail } from "@/data/external/user";

export async function POST (request: NextRequest) {
    const values = await request.json();
    
      const validation = RegisterSchema.safeParse(values);
    
      if (!validation.success) {
        return NextResponse.json(
          {
            error: "ข้อมูลไม่ถูกต้อง",
            description: "โปรดตรวจสอบข้อมูลที่กรอก",
          },
          { status: 400 }
        );
      }
    
    const { email, password, name } = validation.data;
    
    const existingUser = await getUserByEmail(email);
    
      if (existingUser) {
        return NextResponse.json(
          {
            error: "อีเมลนี้ถูกใช้ไปแล้ว",
            description: "กรุณาใช้อีเมลอื่นหรือเข้าสู่ระบบหากเป็นบัญชีของคุณ",
          },
          { status: 409 }
        );
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

       const verificationToken = await generateVerificationToken(email);
       await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token
       );

       return NextResponse.json(
         {
           success: "ลงทะเบียนสำเร็จ",
           description:
             "เราได้ส่งลิงก์ยืนยันอีเมลไปให้คุณแล้ว กรุณาตรวจสอบอีเมล",
         },
         { status: 201 }
       );
     } catch (error) {
       console.error("[REGISTRATION_ERROR]", error);
       return NextResponse.json(
         {
           error: "เกิดข้อผิดพลาดในการลงทะเบียน",
           description: "กรุณาลองใหม่อีกครั้งในภายหลัง",
         },
         { status: 500 }
       );
     }
}