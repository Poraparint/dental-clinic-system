/*
  Warnings:

  - You are about to drop the column `datetime` on the `Dentaltech` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dentaltech" DROP COLUMN "datetime",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postit" TEXT,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ExpensesCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "managerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExpensesCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AppointmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpensesCategory_name_companyId_key" ON "ExpensesCategory"("name", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentCategory_name_companyId_key" ON "AppointmentCategory"("name", "companyId");

-- AddForeignKey
ALTER TABLE "ExpensesCategory" ADD CONSTRAINT "ExpensesCategory_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpensesCategory" ADD CONSTRAINT "ExpensesCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentCategory" ADD CONSTRAINT "AppointmentCategory_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentCategory" ADD CONSTRAINT "AppointmentCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
