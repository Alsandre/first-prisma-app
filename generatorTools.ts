export function TCFeed(taglist: string[]): string[] {
  const urlList: string[] = [];
  for (let tag of taglist) {
    urlList.push(`https://techcrunch.com/tag/${tag}/feed/`);
  }
  return urlList;
}

export function tagBasedURL(tag: string): string {
  return `https://techcrunch.com/tag/${tag}/feed/`;
}
