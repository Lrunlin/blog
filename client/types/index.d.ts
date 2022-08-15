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
    SITE_NAME: string;
  }
}
