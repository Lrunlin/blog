import { NextRequest } from "next/server";
import axios from "@axios";
import setSiteMap from "@/common/modules/sitemap/sitemap";

export async function GET(
  res: NextRequest,
  props: { params: Promise<{ type: string }> },
) {
  const params = await props.params;
  let match = res.nextUrl.pathname.match(/index(\d+)\.xml/);

  if (!match || !["article", "problem"].includes(params.type)) {
    return new Response(undefined, {
      status: 400,
    });
  }

  let sitemap = await axios
    .get(`/sitemap/${params.type}/${match[1]}`)
    .then((res) => setSiteMap(res.data.data))
    .catch((err) => {
      console.log(err);
      return `<error></error>`;
    });

  return new Response(sitemap, {
    status: 200,
    headers: {
      "content-type": "text/xml; charset=utf-8",
    },
  });
}
