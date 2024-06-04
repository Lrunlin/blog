import axios from "@axios";
import setSiteMap from "@/common/modules/sitemap/sitemap-list";
import { NextRequest } from "next/server";

export async function GET(res: NextRequest) {
  let match = res.nextUrl.pathname.match(/\/sitemap\/index(\d+)\.xml/);

  if (!match) {
    return new Response(undefined, {
      status: 400,
    });
  }

  let sitemap = await axios
    .get(`/sitemap/${match[1]}`)
    .then(res => setSiteMap(res.data.data))
    .catch(err => {
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

export const dynamic = "force-dynamic";
