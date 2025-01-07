import type { NextRequest } from "next/server";
import axios from "@axios";

export async function GET(
  res: NextRequest,
  props: { params: Promise<{ type: string }> },
) {
  const params = await props.params;

  const { type } = params;

  const searchParams = res.nextUrl.searchParams;
  const languages = searchParams.get("languages");
  if (["js", "css"].includes(String(type))) {
    let content = await axios
      .get(`/high-light/${type}`, {
        params: { languages: languages },
      })
      .then((res) => res.data);
    return new Response(content, {
      status: 200,
      headers: {
        "content-type": `text/${type}; charset=utf-8`,
        "Cache-Control": `public, max-age=9999999999, must-revalidate`,
      },
    });
  } else {
    return new Response(undefined, {
      status: 404,
    });
  }
}
