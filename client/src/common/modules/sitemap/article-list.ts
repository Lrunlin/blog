interface sitemapItemType {
  href: string | number;
  priority?: number;
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
  <lastmod>${item.create_time}</lastmod>
  <changefreq>weekly</changefreq>
  </url>`;
  });
  const footer = `\n</urlset>`;
  return header + body.join("") + footer;
}
export default setSiteMap;
