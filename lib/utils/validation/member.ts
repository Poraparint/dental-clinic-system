import { getCompanyByManagerId } from "@/data/internal/company";
import { getMemberByCompanyId } from "@/data/internal/member";
import { currentAllStaffExceptAssistant, currentAllStaffExceptTechnician, currentManagerAndDentist, currentManagerAndTechnician} from "@/lib/auth";
import { Company, CompanyRole, Member } from "@prisma/client";
import { NextResponse } from "next/server";

type ValidateManagerResult = | NextResponse | {
    member: Member;
    company: Company;
}

export const validateAllExceptAssistant = async (
  companyId: string
): Promise<ValidateManagerResult> => {
  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "คุณไม่ได้อยู่ในบริษัท",
      },
      { status: 400 }
    );
  }

  const member = await currentAllStaffExceptAssistant();
  if (!member) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
      { status: 403 }
    );
  }

  if (member.role === CompanyRole.MANAGER) {
    const company = await getCompanyByManagerId(companyId, member.id);
    if (!company) {
      return NextResponse.json({ error: "ไม่พบบริษัทของคุณ" }, { status: 404 });
    }
    return { member, company };
  }

  const result = await getMemberByCompanyId(companyId, member.id);
  if (!result?.company) {
    return NextResponse.json(
      { error: "ไม่พบชื่อคุณในบริษัท" },
      { status: 404 }
    );
  }

  return { member, company: result.company };
};

export const validateAllExceptTechnician = async (
  companyId: string
): Promise<ValidateManagerResult> => {
  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "คุณไม่ได้อยู่ในบริษัท",
      },
      { status: 400 }
    );
  }

  const member = await currentAllStaffExceptTechnician();
  if (!member) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
      { status: 403 }
    );
  }

  if (member.role === CompanyRole.MANAGER) {
    const company = await getCompanyByManagerId(companyId, member.id);
    if (!company) {
      return NextResponse.json({ error: "ไม่พบบริษัทของคุณ" }, { status: 404 });
    }
    return { member, company };
  }

  const result = await getMemberByCompanyId(companyId, member.id);
  if (!result?.company) {
    return NextResponse.json(
      { error: "ไม่พบชื่อคุณในบริษัท" },
      { status: 404 }
    );
  }

  return { member, company: result.company };
};

export const validateManagerAndTechnician = async (
  companyId: string
): Promise<ValidateManagerResult> => {
  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "คุณไม่ได้อยู่ในบริษัท",
      },
      { status: 400 }
    );
  }

  const member = await currentManagerAndTechnician();
  if (!member) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
      { status: 403 }
    );
  }

  if (member.role === CompanyRole.MANAGER) {
    const company = await getCompanyByManagerId(companyId, member.id);
    if (!company) {
      return NextResponse.json({ error: "ไม่พบบริษัทของคุณ" }, { status: 404 });
    }
    return { member, company };
  }

  const result = await getMemberByCompanyId(companyId, member.id);
  if (!result?.company) {
    return NextResponse.json(
      { error: "ไม่พบชื่อคุณในบริษัท" },
      { status: 404 }
    );
  }

  return { member, company: result.company };
};

export const validateManagerAndDentist = async (
  companyId: string
): Promise<ValidateManagerResult> => {
  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "คุณไม่ได้อยู่ในบริษัท",
      },
      { status: 400 }
    );
  }

  const member = await currentManagerAndDentist();
  if (!member) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
      { status: 403 }
    );
  }

  if (member.role === CompanyRole.MANAGER) {
    const company = await getCompanyByManagerId(companyId, member.id);
    if (!company) {
      return NextResponse.json({ error: "ไม่พบบริษัทของคุณ" }, { status: 404 });
    }
    return { member, company };
  }

  const result = await getMemberByCompanyId(companyId, member.id);
  if (!result?.company) {
    return NextResponse.json(
      { error: "ไม่พบชื่อคุณในบริษัท" },
      { status: 404 }
    );
  }

  return { member, company: result.company };
};
  
  