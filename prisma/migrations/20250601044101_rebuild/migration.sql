/*
  Warnings:

  - You are about to drop the `TransactionItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transactionCategoryId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_transactionCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionItem" DROP CONSTRAINT "TransactionItem_transactionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionCategoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TransactionItem";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionCategoryId_fkey" FOREIGN KEY ("transactionCategoryId") REFERENCES "TransactionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
