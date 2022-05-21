import express from "express";
import { assets, joinUrl } from "@/store/assetsPath";
import uploadImage from "@/common/modules/image/uploadImage";
import upload from "@/common/middleware/upload";
import auth from "@/common/guards/auth/auth";

const router = express.Router();

router.post("/assets", auth, upload, async (req, res) => {
  uploadImage(req, { dir: "article" })
    .then(result => {
      res.json({
        errno: 0,
        data: joinUrl("article", result as string),
      });
    })
    .catch(err => {
      res.json({
        errno: "上传错误,反正不是0",
        data: "",
      });
    });
});
module.exports = router;
