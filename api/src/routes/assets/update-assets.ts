import express from "express";
import { adminAuth } from "@/common/guards/auth";
import upload from "@/common/middleware/upload";
import uploadImage from "@/common/modules/image/uploadImage";
const router = express.Router();

router.put("/assets/:name", adminAuth, upload, async (req, res) => {
  const imageName = req.params.name;

  uploadImage(req, { dir: "article", name: imageName.split('.')[0]})
    .then(result => {
      res.json({
        success: !!result,
        message: !!result ? "修改成功" : "修改失败",
        data: result,
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "修改失败",
      });
    });
});
module.exports = router;
