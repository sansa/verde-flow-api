-- DropForeignKey
ALTER TABLE "Measurement" DROP CONSTRAINT "Measurement_commitId_fkey";

-- AlterTable
ALTER TABLE "Measurement" ALTER COLUMN "commitId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" TEXT;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
