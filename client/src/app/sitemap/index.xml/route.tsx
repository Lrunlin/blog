import axios from "@axios";
import setSiteMap from "@/common/modules/sitemap/sitemap-list";

export async function GET() {
  let xml = await axios.get("/sitemap").then(res => setSiteMap(res.data.data));
  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "text/xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-dynamic";
