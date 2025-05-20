import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateManager } from "@/lib/utils/validation/manager";
import { MemberRegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/external/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateManager(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }
  try {

    const members = await db.member.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
      select: {
        id: true,
        memberCode: true,
        role: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            isTwoFactorEnabled: true,
          },
        },
        createdAt: true,
      },
    });

    if (members.length < 1) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลพนักงาน",
          description: "เริ่มต้นด้วยการสร้างบัญชีพนักงาน",
        }
      );
    }

    return NextResponse.json(members);
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลหมวดหมู่ได้", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const values = await request.json();

  const { companyId } = await params;

  const accessToPost = await validateManager(companyId);

  if (accessToPost instanceof Response) {
    return accessToPost;
  }

  const { manager } = accessToPost;

  const validation = MemberRegisterSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { email, password, name, phone, memberCode, role } = validation.data;
  
    const existingUserEmail = await getUserByEmail(email);

  if (existingUserEmail) {
    return NextResponse.json({ error: "อีเมลนี้ถูกใช้ไปแล้ว" }, { status: 409 });
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
        managerId: manager.id,
      },
    });

    // Send verification token email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json(
      {
        success:
          "เพิ่มบัญชีพนักงานเรียบร้อยแล้ว! กรุณาให้พนักงานตรวจสอบอีเมลเพื่อยืนยันตัวตน",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[MEMBER_REGISTER_POST]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถสร้างบัญชีพนักงานได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
