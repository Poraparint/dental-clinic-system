/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tcId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_appointmentId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "appointmentId",
ADD COLUMN     "scheduleId" TEXT NOT NULL,
ADD COLUMN     "tcId" TEXT NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_tcId_fkey" FOREIGN KEY ("tcId") REFERENCES "TransactionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "ScheduleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
