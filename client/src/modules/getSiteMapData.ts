import moment from "moment";
import axios from "axios";
import type { response } from "@/types";

interface siteListType {
  id: string;
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

async function getSiteMapData() {
  let list: siteListType[] = [
    {
      id: "",
      weight: 1,
    },
    { id: "design", weight: 0.8 },
    { id: "open-api", weight: 0.6 },
    {
      id: "comment",
      weight: 0.5,
    },
  ];
  let rows = await axios.get<response<{ id: string; time: string; weight: number }[]>>(
    "/sitemap"
  );

  list = [
    ...list,
    ...rows.data.data.map(item => {
      item.weight = 0.9;
      item.id = `article/${item.id}`;
      return item;
    }),
  ];

  let body = list.map(item => {
    return `
    <url>
     <loc>https://blogweb.cn/${item.id}</loc>
     <priority>${item.weight}</priority>
     <lastmod>${moment(item.time || new Date()).format("YYYY-MM-DD")}</lastmod>
     <changefreq>weekly</changefreq>
    </url>`;
  });
  return header + body.join("") + footer;
}
export default getSiteMapData;
