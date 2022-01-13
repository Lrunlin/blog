import { Component } from "react";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { response } from "@/types";
import moment from "moment";

const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
       http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>`;
const footer = `\n</urlset>`;
const list = [
  {
    router: "",
  },
  {
    router: "search",
  },
  { router: "api" },
  { router: "design" },
  {
    router: "comment",
  },
];
export default class SiteMap extends Component {
  static async getInitialProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    let response = await axios.get<response<{ router: string; time: string }[]>>("/sitemap");
    let body = [...list, ...response.data.data].map(item => {
      let url = `${list.some(el => item.router == el.router) ? "" : "article/"}${item.router}`;
      return `
    <url>
     <loc>https://blogweb.cn/${url}</loc>
     <priority>${(item as any).time ? "0.7" : "0.8"}</priority>
     <lastmod>${moment((item as any).time).format("YYYY-MM-DD")}</lastmod>
     <changefreq>weekly</changefreq>
    </url>`;
    });

    res.setHeader("Content-Type", "text/xml");
    res.write(header + body.join("") + footer);
    res.end();
  }
}
