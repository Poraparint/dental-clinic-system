/*
  Warnings:

  - Added the required column `companyId` to the `Dentaltech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dentaltech" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Dentaltech" ADD CONSTRAINT "Dentaltech_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
