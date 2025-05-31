/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Recheck` table. All the data in the column will be lost.
  - Added the required column `createdManagerId` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RecheckList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dentaltech" ADD COLUMN     "updaterUserId" TEXT;

-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "createdManagerId" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedManagerId" TEXT;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "updaterUserId" TEXT;

-- AlterTable
ALTER TABLE "Recheck" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "RecheckList" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" TEXT;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'รอดำเนินการ',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updaterUserId" TEXT,
ALTER COLUMN "patientName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "updaterUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_updaterUserId_fkey" FOREIGN KEY ("updaterUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_updaterUserId_fkey" FOREIGN KEY ("updaterUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dentaltech" ADD CONSTRAINT "Dentaltech_updaterUserId_fkey" FOREIGN KEY ("updaterUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_createdManagerId_fkey" FOREIGN KEY ("createdManagerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_updatedManagerId_fkey" FOREIGN KEY ("updatedManagerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_updaterUserId_fkey" FOREIGN KEY ("updaterUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecheckList" ADD CONSTRAINT "RecheckList_updatedUserId_fkey" FOREIGN KEY ("updatedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
