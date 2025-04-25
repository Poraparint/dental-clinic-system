/*
  Warnings:

  - You are about to drop the column `managerId` on the `DentalTechCategory` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `DentalTechCategory` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `DentalTechCategory` table. All the data in the column will be lost.
  - Added the required column `creatorUserId` to the `DentalTechCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Dentaltech` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DentalTechCategory" DROP CONSTRAINT "DentalTechCategory_managerId_fkey";

-- DropForeignKey
ALTER TABLE "DentalTechCategory" DROP CONSTRAINT "DentalTechCategory_memberId_fkey";

-- AlterTable
ALTER TABLE "DentalTechCategory" DROP COLUMN "managerId",
DROP COLUMN "memberId",
DROP COLUMN "price",
ADD COLUMN     "creatorUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Dentaltech" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "DentalTechCategory" ADD CONSTRAINT "DentalTechCategory_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
