import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import auth from "@/common/guards/auth/auth";
import { v4 } from "uuid";
import { Type } from "@/db";
import useUploadImage from "@/common/modules/image/uploadImage";
import upload from "@/common/middleware/upload";

router.post("/type", auth, upload, async (req: Request, res: Response, next: NextFunction) => {
  let id = v4().replace(/-/g, "");
  let articleType = {
    id: id,
    type: req.body.type + "",
    isShow: !!req.body.isShow,
  };
  try {
    await Type.create(articleType);
    res.json({
      success: true,
      message: "添加成功",
    });
    
    useUploadImage(req, { dir: "type", name: id});
  } catch (error) {
    res.json({
      success: false,
      message: "添加失败",
    });
    useUploadImage(req, false);
  }
});

export default router;
