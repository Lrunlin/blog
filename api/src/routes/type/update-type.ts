import express, { NextFunction, Response, Request } from "express";
import sequelize from "@/db/config";
import { QueryTypes } from "sequelize";
import { Type } from "@/db";
import { articleType } from "@/types";
import { adminAuth } from "@/utils/auth";
const app = express();
const router = express.Router();

router.put("/type/:type", adminAuth, async (req: Request, res: Response, next: NextFunction) => {
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
  }
});
export default router;
