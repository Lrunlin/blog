import { NextRequest } from "next/server";
import fs from "fs";
import mime from "mime";

type Params = {
  name: string;
  path: string[];
};

export async function GET(
  res: NextRequest,
  context: { params: Promise<Params> },
) {
  try {
    let url = (await context.params).path.join("/");
    let name = (await context.params).path.slice(-1)[0];
    let fileHref = `public/vditor/${name}`;

    if (!fs.existsSync(fileHref)) {
      await fetch(`https://unpkg.com/vditor@3.11.0/${url}`)
        .then((res) => res.text())
        .then(async (res) => {
          fs.writeFileSync(fileHref, res);
          return true;
        })
        .catch((err) => {});
    }

    let content = fs.readFileSync(fileHref).toString();

    return new Response(content, {
      status: 200,
      headers: {
        "content-type": (mime.getType(fileHref) as string) + ";charset=utf-8",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(undefined, {
      status: 404,
    });
  }
}
