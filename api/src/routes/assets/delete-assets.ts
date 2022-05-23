import express from "express";
import { adminAuth } from "@/common/guards/auth";
import deleteImage from "@/common/modules/image/deleteImage";
import { imageDir } from "@/types";

let router = express.Router();

router.delete("/assets/:dir/:filename", adminAuth, (req, res) => {
  let result = deleteImage(req.params.dir as imageDir, req.params.filename);
  res.json({
    success: result,
    message: result ? "删除成功" : "删除失败",
  });
});
module.exports = router;
