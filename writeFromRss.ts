import { PrismaClient } from "@prisma/client";
import Parser from "rss-parser";

const prisma = new PrismaClient();
const parser = new Parser();
const url1 = "http://feeds.feedburner.com/Techcrunch";
const url = "https://techcrunch.com/feed/";


async function getSources() {
  const response = await parser.parseURL(url);

  // const feeds = response.items;
  // for (const feed of feeds) {
  //   const link: string | undefined = feed.link;
  //   link && (await prisma.rssLink.create({ data: { url: link } }));
  // }
  for(let date of response.items){

    console.log(date.link);
  }
}
getSources()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
