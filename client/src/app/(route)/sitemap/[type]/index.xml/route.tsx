import { NextRequest } from "next/server";
import axios from "@axios";
import setSiteMap from "@/common/modules/sitemap/sitemap-index";


export async function GET(res: NextRequest, { params }: { params: { type: string } }) {
  let xml = await axios
    .get("/sitemap/" + params.type)
    .then((res) => setSiteMap(res.data.data));
  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "text/xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-dynamic";