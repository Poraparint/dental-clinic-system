"use server";

import { currentRole } from "@/lib/auth";
import { CompanyRole } from "@prisma/client";

export const admin = async () => {
    const role = await currentRole();

    if (role === CompanyRole.MANAGER) {
      return { success: "Allowed Server Action!" };
    }

    return { error: "Forbidden Server Action!" };
};