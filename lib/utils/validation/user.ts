import { getMemberByCompanyId } from "@/data/internal/member";
import { currentUser } from "@/lib/auth";
import { Company, User } from "@prisma/client";
import { NextResponse } from "next/server";

type ValidateUserResult = | NextResponse | {
    user: User;
    company: Company;
}

export const validateCurrentMember = async (
  companyId: string
): Promise<ValidateUserResult> => {
  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "คุณไม่ได้อยู่ในบริษัทนี้",
      },
      { status: 400 }
    );
  }

  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
      { status: 403 }
    );
  }

  const result = await getMemberByCompanyId(companyId, user.id);
  if (!result) {
    return NextResponse.json({ error: "ไม่พบบริษัท" }, { status: 404 });
  }

  return { user, company: result.company };
};
