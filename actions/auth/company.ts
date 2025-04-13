"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CompanyRole } from "@prisma/client";

export const createCompany = async (companyData: { name: string }) => {
  try {
    const existingUser = await currentUser();
    if (!existingUser?.id) {
      throw new Error("User not authenticated");
    }

    return await db.$transaction(async (db) => {
      const company = await db.company.create({
        data: {
          name: companyData.name,
          userId: existingUser.id,
        },
      });

      await db.role.create({
        data: {
          userId: existingUser.id,
          companyId: company.id,
          role: CompanyRole.CEO,
        },
      });

      return {
        success: "Company created successfully!",
        company,
      };
    });
  } catch {
    return { error: "Failed to create company" };
  }
};
