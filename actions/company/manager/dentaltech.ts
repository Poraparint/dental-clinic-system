"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateDentalTechSchema } from "@/schemas";

//lib
import { currentManager } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";

export const createDentalTech = async (
  values: z.infer<typeof CreateDentalTechSchema>,
  companyId: string,
) => {
  const validateFields = CreateDentalTechSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { deadline, patientId, dctId, detail, level } = validateFields.data;
  const existingUser = await currentManager();
  if (!existingUser) {
    console.log(`Manager with ID ${existingUser} not found`);
    return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
  }

  const existingCompany = await getCompanyById(companyId);
  if (!existingCompany) {
    return { error: "ไม่มีบริษัทที่อยู่" };
  }

  try {
    await db.dentaltech.create({
      data: {
        deadline: new Date(deadline),
        patientId,
        dctId,
        detail,
        level,
        companyId,
      },
    });

    return { success: "เพิ่มรายการใหม่สำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างรายการ" };
  }
};
