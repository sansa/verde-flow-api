-- CreateTable
CREATE TABLE "Commit" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "committedAt" TIMESTAMP(3) NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
