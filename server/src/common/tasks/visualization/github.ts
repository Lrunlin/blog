import redis from "@/common/utils/redis";
import axios from "axios";
import moment from "moment";

function getGtiHubData() {
  axios
    .get("https://api.github.com/repos/Lrunlin/blog")
    .then(res => {
      const data = {
        star_count: res.data.stargazers_count,
        fork_count: res.data.forks_count,
        issues_count: res.data.open_issues,
        watch_count: res.data.subscribers_count,
        html_url: res.data.html_url,
        homepage: res.data.homepage,
        refresh_time: moment().format("MM-DD HH:mm:ss"),
      };
      redis.set("visualization-github", JSON.stringify(data));
    })
    .catch(err => {
      //开发环境经常因为代码更新快而限制请求频率
      if (process.env.ENV == "production") {
        console.log(err);
      }
    });
}

export default () => {
  getGtiHubData();
  setInterval(() => {
    getGtiHubData();
  }, 3_600_000);
};
