import express, { NextFunction, Response, Request } from "express";
import sequelize from "@/db/config";
import { Type } from "@/db";
import { adminAuth } from "@/common/guards/auth";
import upload from "@/common/middleware/upload";
import useUploadImage from "@/common/modules/image/uploadImage";
const router = express.Router();

router.put(
  "/type/:id",
  adminAuth,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    let { type, time, isShow, oldValue } = req.body;

    let _data = {
      type,
      time,
      isShow,
    };
    let rows = await Type.update(_data, {
      where: {
        id: id,
      },
    });

    let isSuccess = !!rows[0];
    res.json({
      success: isSuccess,
      message: isSuccess ? "修改成功" : "修改失败",
    });

    if (isSuccess) {
      let typeSql = `update article set type=REPLACE (type,'${oldValue}','${req.body.type}') WHERE type like '%${oldValue}%'`;
      sequelize.query(typeSql);
      useUploadImage(req, { dir: "type", name: id });
    } else {
      useUploadImage(req, false);
    }
  }
);
export default router;
