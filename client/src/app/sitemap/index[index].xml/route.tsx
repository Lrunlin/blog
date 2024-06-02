import axios from "@axios";
import setSiteMap from "@/common/modules/sitemap/sitemap-list";

export async function GET(res: Request) {
  let index = res.url
    .replace(`${process.env.NEXT_PUBLIC_HOST}/sitemap/index`, "")
    .replace(".xml", "");

  let sitemap = await axios.get(`/sitemap/${index}`).then(res => setSiteMap(res.data.data));

  return new Response(sitemap, {
    status: 200,
    headers: {
      "content-type": "text/xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-dynamic";
