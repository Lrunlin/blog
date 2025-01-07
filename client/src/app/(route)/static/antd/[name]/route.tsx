import { NextRequest } from "next/server";
import fs from "fs";

type Params = {
  name: string;
};

export async function GET(
  res: NextRequest,
  context: { params: Promise<Params> },
) {
  let name = (await context.params)!.name as string | undefined;
  if (typeof name == "string" && name?.endsWith(".css")) {
    try {
      let content = fs.readFileSync(`.next/css/${name}`).toString();

      return new Response(content, {
        status: 200,
        headers: {
          "content-type": "text/css; charset=utf-8",
        },
      });
    } catch (error) {
      console.log(error);

      return new Response(undefined, {
        status: 404,
      });
    }
  } else {
    return new Response(undefined, {
      status: 404,
    });
  }
}
