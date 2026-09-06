const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  try {
    console.log("Connecting to Database via Prisma...");
    const users = await prisma.user.findMany();
    console.log("Successfully retrieved users. Count:", users.length);
    console.log("Users:", users);
  } catch (err) {
    console.error("PRISMA DATABASE ERROR DETECTED:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
