"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateExpensesSchema } from "@/schemas";

//lib
import { currentManager } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";

export const createExpenses = async (
  values: z.infer<typeof CreateExpensesSchema>,
  companyId: string
) => {
  const validateFields = CreateExpensesSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { datetime, ecId, name, payment, amount } = validateFields.data;
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
    await db.expenses.create({
      data: {
        datetime: new Date(datetime),
        ecId,
        name,
        payment,
        amount,
        companyId
      },
    });

    return { success: "เพิ่มรายการใหม่สำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างรายการ" };
  }
};
