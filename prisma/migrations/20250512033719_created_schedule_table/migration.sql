/*
  Warnings:

  - You are about to drop the `AppointmentCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `memberId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppointmentCategory" DROP CONSTRAINT "AppointmentCategory_companyId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentCategory" DROP CONSTRAINT "AppointmentCategory_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_appointmentId_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "memberId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AppointmentCategory";

-- CreateTable
CREATE TABLE "ScheduleCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ScheduleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_ac" ON "ScheduleCategory"("companyId", "isDeleted");

-- CreateIndex
CREATE INDEX "idx_ac_all" ON "ScheduleCategory"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleCategory_name_companyId_key" ON "ScheduleCategory"("name", "companyId");

-- AddForeignKey
ALTER TABLE "ScheduleCategory" ADD CONSTRAINT "ScheduleCategory_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleCategory" ADD CONSTRAINT "ScheduleCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "ScheduleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
