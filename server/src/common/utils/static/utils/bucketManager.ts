import qiniu from "qiniu";
import mac from "./Mac";
let config = new qiniu.conf.Config({});
/** 七牛云OSS空间管理器*/
const bucketManager = new qiniu.rs.BucketManager(mac, config);

export default bucketManager;
