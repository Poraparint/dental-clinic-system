import { db } from "@/lib/db";

export const getMemberById = async (id: string) => {
    try {
      const member = await db.member.findUnique({
        where: { id },
        include: {
          company: true,
          twoFactorConfirmation: true,
        }
      });
        return member;
    } catch {
        return null;
    }
}

export const getMemberByEmail = async (email: string) => {
  try {
    const member = await db.member.findUnique({
      where: { email },
    });
    return member;
  } catch (error){
    console.error(`Error fetching member by email (${email}):`, error);
    return null;
  }
};

export const getMemberByCompanyId = async (companyId: string) => {
  try {
    const member = await db.member.findMany({
      where: {companyId},
    });
    return member;
  } catch (error) {
    console.error(
      `Error fetching members by company ID (${companyId}):`,
      error
    );
    return null;
  }
};