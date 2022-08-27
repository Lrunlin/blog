import type { Process } from "node";

// .env中的变量
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV?: string;
      SITE_API_HOST?: string;
      SITE_NAME?: string;
      CLIENT_HOST?: string;
      DB_MYSQL_HOST?: string;
      DB_MYSQL_USER?: string;
      DB_MYSQL_PORT: string;
      DB_MYSQL_PASSWORD: string;
      CDN: string;
      OSS: string;
      QINIU_AK: string;
      QINIU_SK: string;
      OSS_NAME: string;
      BAIDU_MAP_AK: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRETS: string;
      DB_REDIS_HOST: string;
      DB_REDIS_USER: string;
      DB_REDIS_PORT: string;
      DB_REDIS_PASSWORD: string;
      EMAIL_USER: string;
      EMAIL_KEY: string;
      KEY: string;
    }
  }
}
