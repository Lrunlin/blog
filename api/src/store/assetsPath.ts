/** 资源地址*/
const assets = process.env.ENV == "dev" ? `http://localhost:3456/` : `https://assets.blogweb.cn/`;
/** CDN地址*/
const cdn = process.env.ENV == "dev" ? `http://localhost:3456/` : `https://cdn.blogweb.cn/`;
export { assets, cdn };
export default assets;
