import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const isCDN = headersList.get("x-from-cdn");
  return isCDN
    ? {
        rules: {
          userAgent: "*",
          disallow: "/",
        },
      }
    : {
        rules: {
          userAgent: "*",
          allow: "/",
          disallow: [
            // 文章修改和发布
            "/article/editor",
            // 开发者中心
            "/creator",
            // 文章搜索
            "/search",
            // 用户信息
            "/user",
            // 消息提示
            "/notification",
            // oauth登录重定向
            "/oauth",
            // 部分链接的结果展示
            "/result",
            // 友链页面
            "/friendly-link",
            // 中转页面
            "/link",
            // 提问
            "/problem/editor",
            // 收藏页面
            "/collection",
            // 管理员
            "/admin",
            // 找回密码
            "/forget-password",
          ],
        },
        sitemap: `${process.env.NEXT_PUBLIC_HOST}/sitemap.xml`,
      };
}
