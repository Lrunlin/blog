import Router from "@koa/router";
import auth from "@/common/middleware/auth";
import StreamZip from "node-stream-zip";

let router = new Router();

let list: any[] = [];
const zip = new StreamZip({
  file: "public/prism.zip",
  storeEntries: true,
});
zip.on("error", err => {
  throw new Error("文件解压错误");
});
zip.on("ready", () => {
  const data = JSON.parse(zip.entryDataSync("prism/components.json").toString()).languages;
  delete data.meta;
  Object.keys(data).forEach(item => {
    list.push({
      title: data[item].title,
      language: item,
    });
  });
  zip.close();
});
router.get("/language-list",auth(0), async ctx => {
  ctx.body = {
    success: true,
    message: "查询支持代码高亮的语言列表",
    data: list,
  };
});
export default router;
