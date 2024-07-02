import OSS from "ali-oss";

const aliOSS = new OSS({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.CLOUD_SERVER_ACCESS_KEY_ID,
  accessKeySecret: process.env.CLOUD_SERVER_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET,
});
export default aliOSS;
