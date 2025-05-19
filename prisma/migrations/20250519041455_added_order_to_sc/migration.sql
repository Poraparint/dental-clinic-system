/*
  Warnings:

  - Added the required column `order` to the `ScheduleCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduleCategory" ADD COLUMN     "order" INTEGER NOT NULL;
