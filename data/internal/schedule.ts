import { db } from "@/lib/db";

export const getDentistIdByScheduleId = async (
  companyId: string,
  scheduleId: string,
) => {
  const schedule = await db.schedule.findFirst({
    where: {
      id: scheduleId,
      companyId,
      isDeleted: false,
    },
    select: {
        memberId: true,
    },
  });
  return schedule;
};