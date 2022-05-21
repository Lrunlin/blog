import type { imageDir } from "@/types";

/** 图片资源地址*/
const assets =
  process.env.ENV == "dev" ? `http://localhost:3000/image/` : `https://blogweb.cn/api/image/`;
/** CDN地址*/
const cdn =
  process.env.ENV == "dev" ? `http://localhost:3000/image/` : `https://cdn.blogweb.cn/image/`;
  
/**
 * 用于图片文件拼接访问链接
 * @params dir {string} 哪个文件夹
 * @params name {string} 文件夹名
 * @params useCDN {any} 是否使用CDN地址
 * @return url {string} 拼接好的地址
 */
const joinUrl = (dir: imageDir, name: string, useCDN?: any) =>
  `${useCDN ? cdn : assets}${dir}/${name}`;

export { assets, cdn, joinUrl };
export default assets;
