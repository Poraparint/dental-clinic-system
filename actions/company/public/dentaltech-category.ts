"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateDentalTechCategorySchema } from "@/schemas";

//lib
import { currentManagerAndTechnician } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";
import { getDentalTechByName } from "@/data/internal/category";

export const CreateDentalTechCategory = async (
  values: z.infer<typeof CreateDentalTechCategorySchema>,
  companyId: string
) => {
  const validateFields = CreateDentalTechCategorySchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, description } = validateFields.data;

  const existingCategory = await getDentalTechByName(name, companyId);

  if (existingCategory) {
    return { error: "ชื่อนี้ถูกใช้ไปแล้ว" };
  }

  try {
    const existingUser = await currentManagerAndTechnician();
    if (!existingUser) {
      console.log(`Manager with ID ${existingUser} not found`);
      return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
    }

    const existingCompany = await getCompanyById(companyId);
    if (!existingCompany) {
      return { error: "Company not found!" };
    }

    await db.dentalTechCategory.create({
      data: {
        name,
        description,
        companyId,
        creatorUserId: existingUser.id,
      },
    });

    return { success: "เพิ่มหมวดหมู่รายการทันตกรรมสำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างหมวดหมู่ใหม่" };
  }
};
