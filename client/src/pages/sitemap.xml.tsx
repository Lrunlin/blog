import { Component } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import useSiteMap from "@/hooks/useSiteMap";
import axios from "axios";
import { response } from "@/types";
export default class SiteMap extends Component {
  static async getInitialProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    let rows = await axios.get<response<{ router: string; time: string; weight: number }[]>>(
      "/sitemap"
    );
    let data = useSiteMap(rows.data.data);
    res.setHeader("Content-Type", "text/xml");
    res.write(data);
    res.end();
  }
}
