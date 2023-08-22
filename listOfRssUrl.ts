const tagList = [
  "crypto",
  "ai",
  "javascript",
  "react",
  "react native",
  "tailwind",
  "redux",
  "web development",
  "front end development",
];

export function TechCrunchFeedByTagURLGen(taglist: string[]): string[] {
  const urlList: string[] = [];
  for (let tag of taglist) {
    urlList.push(`https://techcrunch.com/tag/${tag}/feed/`);
  }
  return urlList;
}
