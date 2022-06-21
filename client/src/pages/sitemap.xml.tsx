import { Component } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import getSiteMapData from "@/modules/getSiteMapData";

let data = "";

setInterval(() => {
  getSiteMapData().then(res => {
    data = res;
  });
}, 3_600_000);
export default class SiteMap extends Component {
  static async getInitialProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    if (!data) {
      data = await getSiteMapData();
    }
    res.setHeader("Content-Type", "text/xml");
    res.write(data);
    res.end();
  }
}
