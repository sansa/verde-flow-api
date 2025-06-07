import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "jmbanyick@gmail.com" },
    update: {},
    create: {
      name: "Mbanyick Joof",
      email: "jmbanyick@gmail.com",
      password: "password@123!",
    },
  });

  const project = await prisma.project.create({
    data: {
      name: "Green API",
      gitUrl: "https://github.com/test/repo",
      defaultBranch: "main",
      ownerId: user.id,
    },
  });

  const mainBranch = await prisma.branch.create({
    data: {
      name: "main",
      projectId: project.id,
    },
  });

  const devBranch = await prisma.branch.create({
    data: {
      name: "dev",
      projectId: project.id,
    },
  });

  await prisma.measurement.createMany({
    data: [
      {
        branchId: mainBranch.id,
        commitId: "abc123main",
        apiPath: "/api/users",
        httpMethod: "GET",
        energyJoules: 1.02,
        cpuPercent: 20,
        memoryMB: 120,
        latencyMs: 300,
      },
      {
        branchId: devBranch.id,
        commitId: "def456dev",
        apiPath: "/api/users",
        httpMethod: "GET",
        energyJoules: 1.1,
        cpuPercent: 22,
        memoryMB: 125,
        latencyMs: 340,
      },
      {
        branchId: devBranch.id,
        commitId: "def456dev",
        apiPath: "/api/posts",
        httpMethod: "POST",
        energyJoules: 2.5,
        cpuPercent: 35,
        memoryMB: 210,
        latencyMs: 450,
      },
    ],
  });

  console.log("✅ Seeded data successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
