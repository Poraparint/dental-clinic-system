/*
  Warnings:

  - Added the required column `updatedAt` to the `Dentaltech` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Patient_name_phone_job_idx";

-- AlterTable
ALTER TABLE "Dentaltech" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "AppointmentCategory_companyId_idx" ON "AppointmentCategory"("companyId");

-- CreateIndex
CREATE INDEX "Company_managerId_idx" ON "Company"("managerId");

-- CreateIndex
CREATE INDEX "Company_isDeleted_idx" ON "Company"("isDeleted");

-- CreateIndex
CREATE INDEX "DentalTechCategory_companyId_idx" ON "DentalTechCategory"("companyId");

-- CreateIndex
CREATE INDEX "Dentaltech_companyId_idx" ON "Dentaltech"("companyId");

-- CreateIndex
CREATE INDEX "Dentaltech_companyId_status_deadline_idx" ON "Dentaltech"("companyId", "status", "deadline");

-- CreateIndex
CREATE INDEX "Expenses_companyId_idx" ON "Expenses"("companyId");

-- CreateIndex
CREATE INDEX "Expenses_datetime_idx" ON "Expenses"("datetime");

-- CreateIndex
CREATE INDEX "ExpensesCategory_companyId_idx" ON "ExpensesCategory"("companyId");

-- CreateIndex
CREATE INDEX "Member_companyId_role_idx" ON "Member"("companyId", "role");

-- CreateIndex
CREATE INDEX "Member_managerId_idx" ON "Member"("managerId");

-- CreateIndex
CREATE INDEX "Member_isDeleted_idx" ON "Member"("isDeleted");

-- CreateIndex
CREATE INDEX "Patient_companyId_name_idx" ON "Patient"("companyId", "name");

-- CreateIndex
CREATE INDEX "Patient_companyId_phone_idx" ON "Patient"("companyId", "phone");

-- CreateIndex
CREATE INDEX "Patient_isDeleted_idx" ON "Patient"("isDeleted");

-- CreateIndex
CREATE INDEX "Transaction_patientId_idx" ON "Transaction"("patientId");

-- CreateIndex
CREATE INDEX "Transaction_creatorUserId_idx" ON "Transaction"("creatorUserId");

-- CreateIndex
CREATE INDEX "Transaction_isDelete_idx" ON "Transaction"("isDelete");

-- CreateIndex
CREATE INDEX "TransactionCategory_companyId_idx" ON "TransactionCategory"("companyId");
