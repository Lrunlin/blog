import axios from "axios";

/** 根据code获取github用户名*/
async function getGithubName(code: string) {
  const accessToken = await axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRETS,
        code: code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then(res => res.data.access_token)
    .catch(() => false as false);

  if (!accessToken) {
    return false;
  }

  const githubData = await axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      accept: "application/json",
      Authorization: `token ${accessToken}`,
    },
  })
    .then(res => res.data.login)
    .catch(() => false as false);

  return githubData || false;
}
export default getGithubName;
