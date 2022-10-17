import Router from "@koa/router";
import DB from "@/db";
import axios from "axios";
import moment from "moment";
import auth from "@/common/middleware/auth";
import { Op } from "sequelize";

let repositoryData: any = null;
function getGtiHubData() {
  axios
    .get("https://api.github.com/repos/Lrunlin/blog")
    .then(res => {
      repositoryData = {
        star_count: res.data.stargazers_count,
        fork_count: res.data.forks_count,
        issues_count: res.data.open_issues,
        watch_count: res.data.subscribers_count,
        html_url: res.data.html_url,
        homepage: res.data.homepage,
        refresh_time: moment().format("MM-DD hh:mm:ss"),
      };
    })
    .catch(err => {
      console.log(err);
    });
}
getGtiHubData();
setInterval(() => {
  getGtiHubData();
}, 3_600_000);

let router = new Router();
router.get("/statistics/index", auth(), async ctx => {
  let links = DB.Links.findAndCountAll({ where: { state: 0 }, raw: true })
    .then(({ count }) => ({ type: "links", count: count }))
    .catch(() => []);

  let adminId = await DB.User.findAll({ where: { auth: 1 }, attributes: ["id"], raw: true }).then(
    rows => rows.map(item => item.id)
  );

  let comment = DB.Comment.findAndCountAll({
    where: { is_review: 0, user_id: { [Op.not]: adminId } },
    raw: true,
  })
    .then(({ count }) => ({ type: "comment", count: count }))
    .catch(() => []);

  await Promise.all([links, comment])
    .then(data => {
      ctx.body = {
        success: true,
        message: "查询首页内容",
        data: {
          notice: data.flat().filter(item => item.count),
          repository_data: repositoryData,
        },
      };
    })
    .catch(err => {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: "查询失败",
      };
    });
});
export default router;
