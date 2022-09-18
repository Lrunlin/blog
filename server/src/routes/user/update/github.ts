import Router from "@koa/router";
import axios from "axios";

let router = new Router();

router.put("/user/github", async ctx => {
  // let { code } = ctx.request.body;
  // console.log(code);

  // const tokenResponse = await axios.post("https://github.com/login/oauth/access_token", {
  //   client_id: process.env.GITHUB_CLIENT_ID,
  //   client_secret: process.env.GITHUB_CLIENT_SECRETS,
  //   code: code,
  // });
  // console.log(tokenResponse);

  // const accessToken = tokenResponse.data.access_token;
  // const result = await axios({
  //   method: "get",
  //   url: `https://api.github.com/user`,
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `token ${accessToken}`,
  //   },
  // });
  // console.log(result);

  // ctx.body = { key: "value" };
});
export default router;
