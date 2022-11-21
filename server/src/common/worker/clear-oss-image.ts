import DB from "@/db";
import { load } from "cheerio";
import bucketManager from "@/common/utils/static/utils/bucketManager";
import deleteFile from "@/common/utils/static/deleteFile";

let bucket = process.env.OSS_NAME;

const options = {
  prefix: "article/",
};

/** 获取OSS中有保存但是文章中没有使用到的图片名称列表(上传超过七天)*/
async function clearOSSImage() {
  /** 文章中使用到的图片*/
  let images = (await DB.Article.findAll({ attributes: ["content"] })).reduce((total, item) => {
    let $ = load(item.content);
    let imgs = $("img")
      .map((i, el) => $(el).attr("src"))
      .get()
      .filter(_item => item);
    return total.concat(imgs);
  }, [] as string[]);

  bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
    if (err) {
      console.log("七牛云图片列表获取请求错误", "\n", err);
      return;
    }
    if (respInfo.statusCode != 200) {
      console.log("七牛云图片列表请求错误", "\n", respBody);
      return;
    }

    /** 上传超过七天的图片列表*/
    let imageList: string[] = respBody.items
      .filter((item: any) => {
        let time = +String(item.putTime).slice(0, -4);
        return +new Date() - time > 604_800_000;
      })
      .map((item: any) => item.key.replace("article/", ""));

    /** 需要删除的图片列表*/
    let removeImageList = imageList
      .filter(item => !images.includes(item))
      .map(item => `article/${item}`);

    if (removeImageList.length) {
      deleteFile(removeImageList)
        .then(() => {
          console.log(`成功清除未使用的文件${removeImageList.length}个`);
        })
        .catch(mes => {
          console.log(mes);
        });
    }
  });
}
setInterval(() => {
  clearOSSImage();
}, 604_800_000);
export default clearOSSImage;
