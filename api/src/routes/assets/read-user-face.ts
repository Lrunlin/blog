import express from "express";
const router = express.Router();
import fs from "fs";
import { joinUrl, getPublicImage } from "@/store/assetsPath";
import sign from "@/common/guards/auth/sign";
router.get("/user/face", sign, async (req, res) => {
  fs.exists(getPublicImage("face", `${req.userId}.webp`), function (exists) {
    res.json({
      success: exists,
      message: exists ? "获取头像成功" : "用户没有上传过头像",
      data: joinUrl("face", `${req.userId}.webp`),
    });
  });
});
module.exports = router;
