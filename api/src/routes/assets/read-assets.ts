import express from "express";
import fs from "fs";
import moment from "moment";
import { getPublicImage, joinUrl } from "@/store/assetsPath";
import { imageDir } from "@/types";
const router = express.Router();

//系统读取的大小看起来方便，做转换
/**
 * 文件大小格式转换
 * @params fileSize {number} 文件大小（单位B）
 * @return result {string} 转换结果
 */
const formatSize = (fileSize: number): string => {
  let result = "";
  if (fileSize >= 1048576) {
    result =
      fileSize % 1048576 === 0 ? fileSize / 1048576 + "MB" : Math.trunc(fileSize / 1048576) + "MB";
  } else if (fileSize >= 1024) {
    result = fileSize % 1024 === 0 ? fileSize / 1024 + "KB" : Math.trunc(fileSize / 1024) + "KB";
  } else {
    result = fileSize + "B";
  }
  return result;
};
const dirList = ["article", "face"];

router.get("/assets", async (req, res) => {
  // 多个文件内的图片，然后展开，获取每个文件的信息
  let data = dirList
    .map(_dir => {
      return fs
        .readdirSync(getPublicImage(_dir))
        .filter(item => item != ".gitkeep")
        .map(item => {
          return {
            name: item,
            type: _dir,
          };
        });
    })
    .flat(2)
    .map(item => {
      //获取图片信息
      let fileData = fs.statSync(getPublicImage(item.type, item.name));
      // 返回格式
      return {
        name: item.name,
        image_href: joinUrl(item.type as imageDir, item.name),
        size: formatSize(fileData.size),
        // 使用文件最近一次修改的时间戳
        time: moment(fileData.mtime).format("yyyy-MM-DD hh:mm:ss"),
        type: item.type,
      };
    })
    .sort((a, b) => {
      return +new Date(b.time) - +new Date(a.time);
    });
  res.json({
    success: true,
    message: "查询静态文件",
    data: data,
  });
});
module.exports = router;
