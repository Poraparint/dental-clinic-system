"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateTransactionCategorySchema } from "@/schemas";

//lib
import { currentManager } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";
import { getTransactionName } from "@/data/internal/category";

export const CreateTransactionCategory = async (
  values: z.infer<typeof CreateTransactionCategorySchema>,
  companyId: string
) => {
  const validateFields = CreateTransactionCategorySchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, description, price } = validateFields.data;

  const existingCategory = await getTransactionName(name, companyId);

  if (existingCategory) {
    return { error: "ชื่อนี้ถูกใช้ไปแล้ว" };
  }

  try {
    const existingManager = await currentManager();
    if (!existingManager) {
      console.log(`Manager with ID ${existingManager} not found`);
      return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
    }

    const existingCompany = await getCompanyById(companyId);
    if (!existingCompany) {
      return { error: "Company not found!" };
    }

    await db.transactionCategory.create({
      data: {
        name,
        description,
        price,
        companyId,
        managerId: existingManager.id,
      },
    });

    return { success: "เพิ่มหมวดหมู่รายการทำฟันสำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างหมวดหมู่ใหม่" };
  }
};
