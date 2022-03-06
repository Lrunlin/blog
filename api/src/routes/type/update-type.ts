import express, { NextFunction, Response, Request } from "express";
import sequelize from "@/db/config";
import { Type } from "@/db";
import { adminAuth } from "@/common/guards/auth";
import upload from "@/common/middleware/upload";
import useUploadImage from "@/common/modules/image/uploadImage";
import deleteImage from "@/common/modules/image/deleteImage";
import renameImage from "@/common/modules/image/renameImage";
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

    if (isSuccess) {
      let typeSql = `update article set type=REPLACE (type,'${type}','${req.body.type}') WHERE type like '%${type}%'`;
      sequelize.query(typeSql);

      let fileRes = await useUploadImage(req, { dir: "type", name: req.body.type });
      let isTypeUptate = !!(req.params.type != req.body.type);
      //判断有无文件上传
      // 然后判断类型名字是否被修改
      if (fileRes) {
        if (isTypeUptate) {
          deleteImage("type", type);
        }
        //类型变了有文件上传就把旧文件删掉
        // 类型没变有文件上传会自动覆盖
      } else {
        if (isTypeUptate) {
          //类型变了，没有文件上传就对旧文件进行重命名
          renameImage("type", type, req.body.type);
        }
      }
    } else {
      useUploadImage(req, false);
    }
  }
);
export default router;
