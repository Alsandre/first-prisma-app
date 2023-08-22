import { PrismaClient } from "@prisma/client";
import Parser from "rss-parser";
//@ts-ignore
import PSParser from "@postlight/parser";


const prisma = new PrismaClient();
const parser = new Parser();
const url = "https://techcrunch.com/tag/java/feed/";

const techCrunchTagList = ["crypto", "startups"]


async function getSources() {
  const response = await parser.parseURL(url);

  const content = await PSParser.parse(response.items[0].link, {contentType: "text"})
  
  // const feeds = response.items;
  // for (const feed of feeds) {
  //   const link: string | undefined = feed.link;
  //   link && (await prisma.rssLink.create({ data: { url: link } }));
  // }
//   for(let date of response.items){

    console.log(content.content);
//   }
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
