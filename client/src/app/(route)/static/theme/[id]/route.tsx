import type { NextRequest } from "next/server";
import axios from "@axios";

export async function GET(
  res: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  if (!(id as string).endsWith(".css")) {
    return new Response(undefined, {
      status: 404,
    });
  }

  let content = await axios
    .get(`/theme/${(id as string).replace(/.css/, "")}`)
    .then((res) => res.data?.data?.content)
    .catch(() => false);

  if (!content) {
    return new Response(undefined, {
      status: 404,
    });
  }

  return new Response(content, {
    status: 200,
    headers: {
      "content-type": `text/css; charset=utf-8`,
      "Cache-Control": `public, max-age=9999999999, must-revalidate`,
    },
  });
}
