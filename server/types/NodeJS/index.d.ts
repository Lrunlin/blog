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
      /** 七牛云 AK*/
      QINIU_AK: string;
      /** 七牛云SK*/
      QINIU_SK: string;
      /** OSS 名称*/
      OSS_NAME: string;
      /** OSS区 (只支持国内区)*/
      OSS_ZONE: "huadong" | "huabei" | "huanan";
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
