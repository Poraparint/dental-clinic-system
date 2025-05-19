import { getCompanyByManagerId } from "@/data/internal/company";
import { currentManager } from "@/lib/auth";
import { Company, Manager } from "@prisma/client";
import { NextResponse } from "next/server";

type ValidateManagerResult = | NextResponse | {
    manager: Manager;
    company: Company;
}

export const validateManager = async (
  companyId: string
): Promise<ValidateManagerResult> => {
  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "คุณไม่ได้อยู่ในบริษัทนี้",
      },
      { status: 400 }
    );
  }

  const manager = await currentManager();
  if (!manager) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
      { status: 403 }
    );
  }

  const company = await getCompanyByManagerId(companyId, manager.id);
  if (!company) {
    return NextResponse.json({ error: "ไม่พบบริษัท" }, { status: 404 });
  }

  return { manager, company };
};
