import express, { NextFunction, Response, Request } from "express";
import sequelize from "@/db/config";
import { Type } from "@/db";
import { adminAuth } from "@/common/guards/auth";
import upload from "@/common/middleware/upload";
import useUploadImage from "@/common/modules/image/uploadImage";
import deleteImage from "@/common/modules/image/deleteImage";
const router = express.Router();

router.put(
  "/type/:type",
  adminAuth,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    let type = req.params.type;
    let rows = await Type.update(req.body, {
      where: {
        type: type,
      },
    });

    let isSuccess = !!rows[0];
    res.json({
      success: isSuccess,
      message: isSuccess ? "修改成功" : "修改失败",
    });
    console.log(req.file);

    if (isSuccess) {
      let typeSql = `update article set type=REPLACE (type,'${type}','${req.body.type}') WHERE type like '%${type}%'`;
      sequelize.query(typeSql);
      useUploadImage(req, { dir: "type", name: req.body.type });
      deleteImage('type',type);
    } else {
      useUploadImage(req,false);
    }
  }
);
export default router;
