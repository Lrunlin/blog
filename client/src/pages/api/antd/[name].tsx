import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

let distDir: string = JSON.parse(process.env.__NEXT_PRIVATE_RENDER_WORKER_CONFIG as string).distDir;

// 处理生产环境生成的antdcss文件无法访问的问题
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let name = req.query.name as string | undefined;
  if (typeof name == "string" && req.method === "GET" && name?.endsWith(".css")) {
    try {
      let content = fs.readFileSync(`${distDir}/static/css/${name}`).toString();
      res.setHeader("Content-Type", "text/css");
      res.status(200).end(content);
    } catch (error) {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
}
