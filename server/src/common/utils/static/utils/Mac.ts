import qiniu from "qiniu";
/** 七牛云Mac生成*/
const Mac = new qiniu.auth.digest.Mac(process.env.QINIU_AK, process.env.QINIU_SK);
export default Mac;
