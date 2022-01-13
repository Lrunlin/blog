import express, { NextFunction, Response, Request } from "express";
import { User } from "@/db";

const router = express.Router();


// 根据id获取用户信息
router.get("/user/data/:id", async (req: Request, res: Response, next: NextFunction) => {
  let id = req.params.id;
  if (id == "admin") {
    res.json({
      success: true,
      message: "查询用户信息",
      data: {
        email: "admin",
        GitHub: "https://github.com/Lrunlin",
      },
    });
    return false;
  }
  let rows = await User.findByPk(id, {
    attributes: ["email", "GitHub"],
  });
  let isSuccess = !!rows;

  res.json({
    success: isSuccess,
    messagc: isSuccess ? "查询用户信息" : "未查询到指定用户",
    data: rows,
  });
});
export default router;
