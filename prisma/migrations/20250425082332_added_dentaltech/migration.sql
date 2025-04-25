/*
  Warnings:

  - Made the column `status` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "status" SET NOT NULL;

-- CreateTable
CREATE TABLE "DentalTechCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "managerId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DentalTechCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dentaltech" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "detail" TEXT,
    "level" TEXT NOT NULL DEFAULT 'ปกติ',
    "status" TEXT NOT NULL DEFAULT 'รอดำเนินการ',
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Dentaltech_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DentalTechCategory_name_companyId_key" ON "DentalTechCategory"("name", "companyId");

-- AddForeignKey
ALTER TABLE "DentalTechCategory" ADD CONSTRAINT "DentalTechCategory_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DentalTechCategory" ADD CONSTRAINT "DentalTechCategory_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DentalTechCategory" ADD CONSTRAINT "DentalTechCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dentaltech" ADD CONSTRAINT "Dentaltech_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
