import { db } from "@/lib/db";

export const getMemberById = async (id: string) => {
    try {
        const member = await db.member.findUnique({
            where:{id},
        })
        return member;
    } catch {
        return null;
    }
}

export const getMemberByemail = async (email: string) => {
  try {
    const member = await db.member.findUnique({
      where: { email },
    });
    return member;
  } catch {
    return null;
  }
};

export const getMemberByCompanyId = async (companyId: string) => {
  try {
    const member = await db.member.findMany({
      where: {company:{id: companyId}},
    });
    return member;
  } catch {
    return null;
  }
};