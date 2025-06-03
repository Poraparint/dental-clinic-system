-- CreateTable
CREATE TABLE "AddonItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AddonItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionAddon" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "addonItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionAddon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AddonItem_companyId_isDeleted_idx" ON "AddonItem"("companyId", "isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "AddonItem_name_companyId_key" ON "AddonItem"("name", "companyId");

-- CreateIndex
CREATE INDEX "TransactionAddon_addonItemId_idx" ON "TransactionAddon"("addonItemId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionAddon_transactionId_addonItemId_key" ON "TransactionAddon"("transactionId", "addonItemId");

-- AddForeignKey
ALTER TABLE "AddonItem" ADD CONSTRAINT "AddonItem_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddonItem" ADD CONSTRAINT "AddonItem_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAddon" ADD CONSTRAINT "TransactionAddon_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAddon" ADD CONSTRAINT "TransactionAddon_addonItemId_fkey" FOREIGN KEY ("addonItemId") REFERENCES "AddonItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
