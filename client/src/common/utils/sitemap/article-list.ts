import dayjs from "dayjs";
interface sitemapItemType {
  href: string | number;
  priority?: number;
  update_time?: Date;
  create_time?: Date;
}
/** 处理文章的sitemap*/
function setSiteMap(list: sitemapItemType[]) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>`;
  let body = list.map(item => {
    return `
  <url>
  <loc>${item.href}</loc>
  <priority>${item.priority || 0.9}</priority>
  <lastmod>${dayjs(item.update_time || item.create_time).format("YYYY-MM-DD")}</lastmod>
  <changefreq>weekly</changefreq>
  </url>`;
  });
  const footer = `\n</urlset>`;
  return header + body.join("") + footer;
}
export default setSiteMap;
