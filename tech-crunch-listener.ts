import { PrismaClient } from "@prisma/client";
import Parser from "rss-parser";
//@ts-ignore
import PSParser from "@postlight/parser";

import { TCFeed } from "./generatorTools";
import { TAG_LIST } from "./data";

const prisma = new PrismaClient();
const parser = new Parser();
const urlList = TCFeed(TAG_LIST);

async function getSources() {
  const feedList = [];
  for (let url of urlList) {
    try {
      const response = await parser.parseURL(url);
      feedList.push(response);
    } catch (e) {
      console.log(e);
    }
  }
  const listOfContentLinks = feedList.reduce((acc: string[], feed) => {
    for(let item of feed.items){
        item.link && acc.push(item.link)
    }
    return acc;
  }, [])
  console.log(listOfContentLinks)
  for(let url of listOfContentLinks){
    //access and use content
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
