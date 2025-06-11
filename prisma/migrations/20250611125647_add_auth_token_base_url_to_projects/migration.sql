-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "authToken" TEXT,
ADD COLUMN     "baseUrl" TEXT,
ALTER COLUMN "status" SET DEFAULT 'Active';
