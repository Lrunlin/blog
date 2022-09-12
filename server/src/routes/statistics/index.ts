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
    .catch(() => {});
}
getGtiHubData();
setInterval(() => {
  getGtiHubData();
}, 3_600_000);



let router = new Router();
router.get("/statistics/index", auth(), async ctx => {
  let links = DB.Links.findAndCountAll({ where: { state: 0 } }).then(({ rows }) => rows);

  await Promise.all([links])
    .then(data => {
      ctx.body = {
        success: true,
        message: "查询首页内容",
        data: {
          links: data[0],
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
