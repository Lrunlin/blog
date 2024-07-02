import qiniu from "qiniu";

/** 七牛云Mac生成*/
const Mac = new qiniu.auth.digest.Mac(
  process.env.CLOUD_SERVER_ACCESS_KEY_ID,
  process.env.CLOUD_SERVER_ACCESS_KEY_SECRET,
);
export default Mac;
