"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateScheduleSchema } from "@/schemas";

//lib
import { currentAllStaffExceptTechnician } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";
import { formatDateOnly } from "@/lib/utils";

export const Schedule = async (
  values: z.infer<typeof CreateScheduleSchema>,
  companyId: string
) => {
  const validateFields = CreateScheduleSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { datetime, scheduleId, tcId, phone, patientName, detail, memberId } = validateFields.data;

  const existingUser = await currentAllStaffExceptTechnician();
  if (!existingUser) {
    return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
  }

  const existingCompany = await getCompanyById(companyId);
  if (!existingCompany) {
    return { error: "Company not found!" };
  }

  try {
    await db.schedule.create({
        data: {
          datetime: formatDateOnly(datetime),
            patientName,
            phone,
            detail,
            scheduleId,
            tcId,
            memberId,
            creatorUserId: existingUser.id,
          companyId
      },
    });
    return { success: "เพิ่มรายการใหม่สำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างรายการ" };
  }
};
