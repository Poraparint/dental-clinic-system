/*
  Warnings:

  - Added the required column `transactionId` to the `TransactionAddon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionAddon" DROP CONSTRAINT "TransactionAddon_id_fkey";

-- DropIndex
DROP INDEX "TransactionAddon_id_addonItemId_key";

-- AlterTable
ALTER TABLE "TransactionAddon" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionAddon" ADD CONSTRAINT "TransactionAddon_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
