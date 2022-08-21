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
    NEXT_PUBLIC_ENV: "development" | "production";
    /** 网站名称*/
    NEXT_PUBLIC_SITE_NAME: string;
    /** API接口地址*/
    NEXT_PUBLIC_API_HOST: string;
    /** CDN*/
    NEXT_PUBLIC_CDN: string;
    /** Redis用户名*/
    NEXT_PUBLIC_DB_REDIS_USER: string;
    /** Redis端口号*/
    NEXT_PUBLIC_DB_REDIS_PORT: number;
    /** Redis密码*/
    NEXT_PUBLIC_DB_REDIS_PASSWORD: string | number;
  }
}
