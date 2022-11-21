import qiniu from "qiniu";
import mac from "./Mac";
import zone from "./zone";
let config = new qiniu.conf.Config({
  zone: zone,
});
/** 七牛云OSS空间管理器*/
const bucketManager = new qiniu.rs.BucketManager(mac, config);

export default bucketManager;
