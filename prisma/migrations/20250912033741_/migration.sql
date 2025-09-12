/*
  Warnings:

  - A unique constraint covering the columns `[id,companyId]` on the table `Dentaltech` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dentaltech_id_companyId_key" ON "Dentaltech"("id", "companyId");
