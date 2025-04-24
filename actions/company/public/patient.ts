"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreatePatientSchema } from "@/schemas";

//lib
import { currentManagerAndDentist } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";
import { getPatientByName } from "@/data/internal/patient";

export const createPatient = async (
  values: z.infer<typeof CreatePatientSchema>,
  companyId: string
) => {
  const validateFields = CreatePatientSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, phone, age, address, job, work, worktel, cd, drug } =
    validateFields.data;

  const existingPatient = await getPatientByName(name, companyId);

  if (existingPatient) {
    return { error: "ชื่อนี้ถูกใช้ไปแล้ว" };
  }

  try {
    const existingUser = await currentManagerAndDentist();
    if (!existingUser) {
      console.log(`Manager with ID ${existingUser} not found`);
      return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
    }

    const existingCompany = await getCompanyById(companyId);
    if (!existingCompany) {
      return { error: "Company not found!" };
    }

    await db.patient.create({
      data: {
        name,
        phone,
        age,
        address,
        job,
        work,
        worktel,
        cd,
        drug,
        companyId,
        creatorUserId: existingUser.id,
      },
    });

    return { success: "เพิ่มบัตรใหม่สำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างบัตรใหม่" };
  }
};
