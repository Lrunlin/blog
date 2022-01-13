import express, { NextFunction, Response, Request } from "express";
import axios from "axios";
const app = express();
const router = express.Router();
let bg = {
  url: "",
  title: "",
};
function getBG() {
  axios.get("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1").then(res => {
    let data: any = res.data.images[0];
    bg.url = `https://cn.bing.com${data.url}`;
  });
}
getBG();
setTimeout(() => {
  getBG();
}, 86_400_000);
axios
  .get("https://v2.jinrishici.com/sentence", {
    headers: { "X-User-Token": "RgU1rBKtLym/MhhYIXs42WNoqLyZeXY3EkAcDNrcfKkzj8ILIsAP1Hx0NGhdOO1I" },
  })
  .then(res => {
    bg.title = res.data.data.content;
  });

/**
 * 返回背景图片和随机诗词
 */
router.get("/user/background", async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    success: true,
    message: "随机返回一张背景图片",
    data: bg,
  });
});
export default router;
