import dayjs from "dayjs";

interface sitemapItemType {
  href: string | number;
}
/** 处理sitemap-list*/
function setSiteMap(list: sitemapItemType[]) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  let body = list.map(item => {
    return `
    <sitemap >
     <loc>${item.href}</loc>
     <lastmod>${dayjs().format("YYYY-MM-DD")}</lastmod>
    </sitemap>`;
  });
  const footer = `\n</sitemapindex>`;
  return header + body.join("") + footer;
}
export default setSiteMap;
