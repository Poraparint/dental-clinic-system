/*
  Warnings:

  - Added the required column `scheduleId` to the `RecheckList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecheckList" ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RecheckList" ADD CONSTRAINT "RecheckList_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "ScheduleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
