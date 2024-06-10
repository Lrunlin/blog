import Cdn, * as $Cdn from "@alicloud/cdn20180510";
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";

export default function refreshUrls(url: string[]) {
  let config = new $OpenApi.Config({});
  // 您的AccessKey ID
  config.accessKeyId = process.env.CLOUD_SERVER_ACCESS_KEY_ID;
  // 您的AccessKey Secret
  config.accessKeySecret = process.env.CLOUD_SERVER_ACCESS_KEY_SECRET;
  // 访问的域名
  config.endpoint = "cdn.aliyuncs.com";
  let req = new $Cdn.RefreshObjectCachesRequest({});
  req.objectPath = url.join("\n");
  return new Cdn(config)
    .refreshObjectCaches(req)
    .then(res => res)
    .catch(err => err);
}
