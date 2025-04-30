-- AlterTable
ALTER TABLE "ExpensesCategory" ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "memberCode" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "ecId" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_ecId_fkey" FOREIGN KEY ("ecId") REFERENCES "ExpensesCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
