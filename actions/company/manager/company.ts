"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateCompanySchema } from "@/schemas";

//lib
import { currentManager } from "@/lib/auth";

export const createCompany = async (
  values: z.infer<typeof CreateCompanySchema>
) => {
  const validateFields = CreateCompanySchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, description } = validateFields.data;

  const existingManager = await currentManager();
  if (!existingManager) {
    return { error: "คุณไม่มีสิทธิเพิ่มข้อมูล" };
  }
  try {
    await db.company.create({
      data: {
        name,
        description,
        managerId: existingManager.id,
      },
    });

    return { success: "สร้างบริษัทสำเร็จ!" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างบริษัท" };
  }
};
