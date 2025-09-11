-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_memberId_fkey";

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "memberId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
