declare module "@emoji-mart/react" {
  const a: any;
  export default a;
}
declare module "bytemd/lib/locales/*" {
  export const a: any;
}

namespace NodeJS {
  interface ProcessEnv {
    /** 环境*/
    NODE_ENV: "development" | "production";
    /** 网站名称*/
    NEXT_PUBLIC_SITE_NAME: string;
    /** 本站域名*/
    NEXT_PUBLIC_HOST: string;
    /** API接口地址*/
    NEXT_PUBLIC_API_HOST: string;
    /** CDN*/
    CDN: string;
    /** Redis用户名*/
    REDIS_USER: string;
    /** Redis端口号*/
    REDIS_PORT: number;
    /** Redis密码*/
    REDIS_PASSWORD: string | number;
    /** GitHub的ClientID用来登录*/
    NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
  }
}
