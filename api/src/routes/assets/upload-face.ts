import express from "express";
import { joinUrl } from "@/store/assetsPath";
import uploadImage from "@/common/modules/image/uploadImage";
import upload from "@/common/middleware/upload";
import sign from "@/common/guards/auth/sign";
const router = express.Router();

router.post("/user/face", sign, upload, async (req, res) => {
    
  uploadImage(req, { dir: "face", name: req.userId })
    .then(result => {
      res.json({
        success: true,
        message: "上传成功",
        data: joinUrl("face", result as string),
      });
    })
    .catch(err => {
      console.log(err);

      res.json({
        success: false,
        message: "上传失败",
      });
    });
});
module.exports = router;
