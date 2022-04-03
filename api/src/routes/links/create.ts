import express, { NextFunction, Response, Request } from "express";
const app = express();
const router = express.Router();
import auth from "@/common/guards/auth/auth";
import { v4 } from "uuid";
import { Links } from "@/db";

router.post("/links", auth, async (req: Request, res: Response, next: NextFunction) => {
  let id = v4().replace(/-/g, "");
  let links = {
    id: id,
    name: req.body.name + "",
    description: req.body.description + "",
    url: req.body.url + "",
    logo: req.body.logo + "",
    drainage: !!req.body.drainage,
  };
  
  try {
    await Links.create(links);
    res.json({
      success: true,
      message: "添加成功",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "添加失败",
    });
  }
});

export default router;
