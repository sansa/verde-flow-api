-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "commitId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "apiPath" TEXT NOT NULL,
    "httpMethod" TEXT NOT NULL,
    "apiRequestId" TEXT,
    "energyJoules" DOUBLE PRECISION NOT NULL,
    "cpuPercent" DOUBLE PRECISION NOT NULL,
    "memoryMB" DOUBLE PRECISION NOT NULL,
    "latencyMs" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
