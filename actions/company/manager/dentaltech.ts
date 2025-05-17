"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateDentalTechSchema } from "@/schemas";

//lib
import { currentManagerAndDentist } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";
import { getDentalTechByCompanyId } from "@/data/internal/recheck-dentaltech";
import { getPatientByTransactionId } from "@/data/internal/transaction";
import { formatDateOnly } from "@/lib/utils";

export const createDentalTech = async (
  values: z.infer<typeof CreateDentalTechSchema>,
  companyId: string,
) => {
  const validateFields = CreateDentalTechSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { deadline, transactionId, dctId, detail, teeth, level } = validateFields.data;
  const existingDentaltech = await getDentalTechByCompanyId(
    transactionId,
    companyId
  );

  if (existingDentaltech) {
    return { error: "รหัสธุรกรรมนี้ถูกใช้ไปแล้ว" };
  }

  const existingUser = await currentManagerAndDentist();

  if (!existingUser) {
    console.log(`Manager with ID ${existingUser} not found`);
    return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
  }

  const existingCompany = await getCompanyById(companyId);

  if (!existingCompany) {
    return { error: "ไม่มีบริษัทที่อยู่" };
  }
const patientId = await getPatientByTransactionId(transactionId);

  if (!patientId) {
    return { error: "รหัสธุรกรรมไม่ถูกต้องหรือไม่มีรหัสธุรกรรมนี้" };
  }
  
  try {
    await db.dentaltech.create({
      data: {
        id: transactionId,
        deadline: formatDateOnly(deadline),
        transactionId,
        dctId,
        detail,
        teeth,
        level,
        patientId: patientId.patient.id,
        creatorUserId: existingUser.id,
        companyId,
      },
    });

    return { success: "เพิ่มรายการใหม่สำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างรายการ" };
  }
};
