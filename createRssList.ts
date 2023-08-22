import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createEndpoint() {
    const rssStringList = await prisma.source.findMany()
    console.log(rssStringList)
}

createEndpoint().then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });