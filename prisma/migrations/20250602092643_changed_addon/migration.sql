/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `TransactionAddon` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `TransactionAddon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,addonItemId]` on the table `TransactionAddon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `TransactionAddon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionAddon" DROP CONSTRAINT "TransactionAddon_transactionId_fkey";

-- DropIndex
DROP INDEX "TransactionAddon_transactionId_addonItemId_key";

-- AlterTable
ALTER TABLE "AddonItem" ALTER COLUMN "unitPrice" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TransactionAddon" DROP COLUMN "totalPrice",
DROP COLUMN "transactionId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TransactionAddon_id_addonItemId_key" ON "TransactionAddon"("id", "addonItemId");

-- AddForeignKey
ALTER TABLE "TransactionAddon" ADD CONSTRAINT "TransactionAddon_id_fkey" FOREIGN KEY ("id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
