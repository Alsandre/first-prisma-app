import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Fetch all news articles
    const allLinks = await prisma.rssLink.findMany();
    const tempArr = []
    for(let item of allLinks){
      tempArr.push(item.url)
    }
    const setOfUniqueLinks = new Set(tempArr);
    console.log([...setOfUniqueLinks].length);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  throw e;
});
