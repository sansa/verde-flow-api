import prisma from "../../config/db.js";

export async function getMeasurementsByBranch(branchId, userId) {
  const branch = await prisma.branch.findUnique({
    where: { id: branchId },
    include: {
      project: true,
      measurements: true,
    },
  });

  if (!branch || branch.project.ownerId !== userId) {
    throw new Error("Branch not found or unauthorized");
  }

  return branch.measurements;
}

export async function compareMeasurements(
  targetBranchId,
  baselineBranchId,
  userId
) {
  const [target, baseline] = await Promise.all([
    prisma.branch.findUnique({
      where: { id: targetBranchId },
      include: { project: true, measurements: true },
    }),
    prisma.branch.findUnique({
      where: { id: baselineBranchId },
      include: { project: true, measurements: true },
    }),
  ]);

  if (
    !target ||
    !baseline ||
    target.project.ownerId !== userId ||
    baseline.project.ownerId !== userId
  ) {
    throw new Error("Branches not found or unauthorized");
  }

  const format = list =>
    list.reduce((acc, m) => {
      const key = `${m.httpMethod} ${m.apiPath}`;
      acc[key] = m;
      return acc;
    }, {});

  const baseMap = format(baseline.measurements);
  const targetMap = format(target.measurements);

  const diff = Object.entries(targetMap).map(([key, targetMetric]) => {
    const baselineMetric = baseMap[key];
    return {
      endpoint: key,
      target: targetMetric,
      baseline: baselineMetric || null,
      delta: baselineMetric
        ? {
            energyJoules:
              targetMetric.energyJoules - baselineMetric.energyJoules,
            cpuPercent: targetMetric.cpuPercent - baselineMetric.cpuPercent,
            memoryMB: targetMetric.memoryMB - baselineMetric.memoryMB,
            latencyMs: targetMetric.latencyMs - baselineMetric.latencyMs,
          }
        : null,
    };
  });

  return diff;
}
