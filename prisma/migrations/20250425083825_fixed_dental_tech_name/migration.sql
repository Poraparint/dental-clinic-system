/*
  Warnings:

  - You are about to drop the column `name` on the `Dentaltech` table. All the data in the column will be lost.
  - Added the required column `dctId` to the `Dentaltech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dentaltech" DROP COLUMN "name",
ADD COLUMN     "dctId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Dentaltech" ADD CONSTRAINT "Dentaltech_dctId_fkey" FOREIGN KEY ("dctId") REFERENCES "DentalTechCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
