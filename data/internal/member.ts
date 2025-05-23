import { db } from "@/lib/db";

export const getMemberById = async (id: string) => {
  try {
    const member = await db.member.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });
    return member;
  } catch {
    return null;
  }
};

export const getAllMembersByCompanyId = async (companyId: string) => {
  try {
    const member = await db.member.findMany({
      where: { companyId },
    });
    return member;
  } catch {
    return null;
  }
};

export const getMemberByCompanyId = async (companyId: string, memberId: string) => {
try {
  const member = await db.member.findUnique({
    where: {
      id: memberId,
      companyId
    },
    include: {
      company: true,
    }
  });
  return member;
} catch {
  return null;
}
};
