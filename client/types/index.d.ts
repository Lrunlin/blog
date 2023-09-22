declare module "@emoji-mart/react" {
  const a: any;
  export default a;
}
declare module "bytemd/lib/locales/*" {
  const a: any;
  export default a;
}

declare module "turndown-plugin-gfm" {
  let a: any;
  export default a;
}

namespace NodeJS {
  interface ProcessEnv {
    /** 环境*/
    NODE_ENV: "development" | "production";
    /** 是否开发环境*/
    NEXT_PUBLIC_ISDEV?: true;
    /** 是否生产环境*/
    NEXT_PUBLIC_ISPRO?: true;
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
    REDIS_PASSWORD: string;
    /** GitHub的ClientID用来登录*/
    NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
    /** Google ADS中的client_id 填入数字部分即可*/
    NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID: string;
    /** ins标签的d-slot*/
    NEXT_PUBLIC_GOOGLE_ADS_SLOT: string;
    /** 站长QQ*/
    QQ: string;
    /** 站长邮箱*/
    EMAIL: string;
    /** GItHub主页地址*/
    GITHUB: string;
    /** ICP 备案号*/
    ICP: string;
    /** 上传图片最大多MB*/
    UPLOAD_MAX_SIZE: number;
  }
}
