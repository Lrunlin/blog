import moment from "moment";

interface siteListType {
  router: string;
  weight: number;
  time?: string;
}
const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>`;

const footer = `\n</urlset>`;

let list: siteListType[] = [
  {
    router: "",
    weight: 1,
  },
  { router: "design", weight: 0.8 },
  { router: "open-api", weight: 0.6 },
  {
    router: "comment",
    weight: 0.5,
  },
];

function getSiteMap(data: siteListType[]) {
  list = [
    ...list,
    ...data.map(item => {
      item.weight = 0.9;
      item.router = `article/${item.router}`;
      return item;
    }),
  ];
  let body = list.map(item => {
    return `
    <url>
     <loc>https://blogweb.cn/${item.router}</loc>
     <priority>${item.weight}</priority>
     <lastmod>${moment(item.time || new Date()).format("YYYY-MM-DD")}</lastmod>
     <changefreq>weekly</changefreq>
    </url>`;
  });
  return header + body.join("") + footer;
}
/**
 * todo 返回sitemap.xml
 * @return str {string} sitemap
 */
const useSiteMap = (data: siteListType[]) => {
  return getSiteMap(data);
};
export default useSiteMap;
