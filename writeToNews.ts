import { PrismaClient } from "@prisma/client";
//@ts-ignorets-ignore
import Parser from "@postlight/parser";

const prisma = new PrismaClient();

async function main() {
  try {
    // Fetch all news articles
    const allLinks = await prisma.rssLink.findMany();
    const tempArr = [];
    for (let item of allLinks) {
      tempArr.push(item.url);
    }
    const setOfUniqueLinks = new Set(tempArr);
    const uniqueLinkNewsURLs = [...setOfUniqueLinks];
    for (let url of uniqueLinkNewsURLs) {
      let { title, content, date_published, author }: any = await Parser.parse(
        url,
        { contentType: "text" }
      );
      if (typeof title !== "string") title = "" + title;
      if (typeof author !== "string") author = "" + author;
      let publishedAt;
      if (
        date_published instanceof Date &&
        isFinite(date_published.getTime())
      ) {
        publishedAt = date_published;
      } else publishedAt = new Date(Date.now());
      const newsData = {
        title,
        content,
        publishedAt,
        author,
      };
      await prisma.news.create({ data: newsData });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });