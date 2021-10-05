const express = require("express");
const app = express();
const router = express.Router();
const pool = require("@/modules/pool");
const switchArticleModel = require('@/modules/switchArticleModel.js');
router.get("/article/page/:page", async (req, res) => {
  const key = req.query?.key ?.join(",");
  let page = +req.params.page;
  let show = req.query.show;
  let sql = `select ${key || "*"} from article ${
    show ? "WHERE isShow=1" : ""
  } ORDER BY time DESC LIMIT ${(page - 1) * 10},10;`;
  // 分页查询从XX索引值开始，向后偏移10条
  const [data] = await pool.query(sql);
  data.map(item =>
    switchArticleModel(item)
  );
  let [max] = await pool.query(
    `SELECT COUNT(router) FROM article ${show ? "WHERE isShow=1" : ""};`
  );
    res.json({
      success: true,
      message: `分页查询${key || "*"}（降序）`,
      max: max[0]["COUNT(router)"],
      data: data,
    });
});

module.exports = router;