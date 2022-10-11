import Router from "@koa/router";
import DB from "@/db";
import moment from "moment";
let router = new Router();

interface sitemapItemType {
  id: string | number;
  priority?: number;
  update_time?: Date;
  create_time?: Date;
}
function setSiteMap(list: sitemapItemType[]) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>`;
  const footer = `\n</urlset>`;
  let body = list.map(item => {
    return `
    <url>
     <loc>${process.env.CLIENT_HOST}/${item.id ? `article/${item.id}` : item.id}</loc>
     <priority>${item.priority || 0.9}</priority>
     <lastmod>${moment(item.update_time || item.update_time).format("YYYY-MM-DD")}</lastmod>
     <changefreq>weekly</changefreq>
    </url>`;
  });
  return header + body.join("") + footer;
}
let list = [{ id: "", priority: 1, create_time: new Date() }];
router.get("/sitemap", async ctx => {
  await DB.Article.findAll({
    where: { state: 1 },
    attributes: ["id", "update_time", "create_time"],
    order: [["reprint", "asc"]],
    raw: true,
  }).then(rows => {
    ctx.body = {
      success: true,
      message: "获取sitemap.xml",
      data: setSiteMap([...list, ...rows]),
    };
  });
});
export default router;
