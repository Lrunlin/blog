import type { Process } from "node";

// .env中的变量
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** 环境变量*/
      ENV: "development" | "production";
      /** 服务端接口地址*/
      SITE_API_HOST: string;
      /** 网站名称*/
      SITE_NAME: string;
      /** 用户端网址*/
      CLIENT_HOST: string;
      /** 用户端使用的CDN地址*/
      CLIENT_CDN: string;
      /** 验证方式jwt|session*/
      AUTH_MODE?: "session" | "jwt";
      /** MySQL域名*/
      DB_MYSQL_HOST?: string;
      /** MySQL用户名*/
      DB_MYSQL_USER?: string;
      /** MySQL端口号*/
      DB_MYSQL_PORT: string;
      /** MySQL密码*/
      DB_MYSQL_PASSWORD: string;
      /** CDN地址*/
      CDN: string;
      /** 云服务商 阿里、七牛*/
      CLOUD_SERVER: "ali" | "qiniu";
      /** 云服务商 AK*/
      CLOUD_SERVER_ACCESS_KEY_ID: string;
      /** 云服务商*/
      CLOUD_SERVER_ACCESS_KEY_SECRET: string;
      /** OSS 名称*/
      OSS_BUCKET: string;
      /** OSS区 (只支持国内区)*/
      OSS_REGION: "huadong" | "huabei" | "huanan" | string;
      /** 百度地图AK*/
      BAIDU_MAP_AK: string;
      /** GitHub Client ID*/
      GITHUB_CLIENT_ID: string;
      /** GitHub 密钥*/
      GITHUB_CLIENT_SECRETS: string;
      /** Redis 域名*/
      DB_REDIS_HOST: string;
      /** Redis 用户*/
      DB_REDIS_USER: string;
      /** Redis 端口号*/
      DB_REDIS_PORT: string;
      /** Redis 密码*/
      DB_REDIS_PASSWORD: string;
      /** QQ账号*/
      EMAIL_USER: string;
      /** email key*/
      EMAIL_KEY: string;
      /** 密钥*/
      KEY: string;
    }
  }
}
