/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Dentaltech` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorUserId` to the `Dentaltech` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Dentaltech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dentaltech" ADD COLUMN     "creatorUserId" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dentaltech_id_key" ON "Dentaltech"("id");

-- AddForeignKey
ALTER TABLE "Dentaltech" ADD CONSTRAINT "Dentaltech_id_fkey" FOREIGN KEY ("id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dentaltech" ADD CONSTRAINT "Dentaltech_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
