import cookie from "js-cookie";

const getDomain = (host: string) => {
  // 处理不同的环境和域名
  if (
    host.startsWith("http://localhost") ||
    host.startsWith("http://127.0.0.1") ||
    host.startsWith("http://192.168")
  ) {
    return "localhost"; // 开发环境使用 localhost
  }

  const url = new URL(host);
  const domainParts = url.hostname.split(".").slice(-2);

  // 返回带点的域名，例如 .example.com
  return `.${domainParts.join(".")}`;
};

const option = {
  expires: 365,
  domain: getDomain(process.env.NEXT_PUBLIC_HOST),
};

function setToken(token: string) {
  cookie.set("token", token, option);
}

function removeToken() {
  cookie.remove("token");
}

function getToken() {
  return cookie.get("token");
}

export { setToken, removeToken, getToken };
