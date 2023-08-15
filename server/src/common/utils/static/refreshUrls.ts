import qiniu from "qiniu";
import Mac from "./utils/Mac";

function refreshUrls(list: string[]):Promise<string|undefined> {
  let cdnManager = new qiniu.cdn.CdnManager(Mac);
  return new Promise((resolve, reject) => {
    cdnManager.refreshUrls(list, function (err, respBody, respInfo) {
      if (err) {
        reject(err);
        return;
      }
      if (respInfo.statusCode == 200) {
        resolve(undefined);
      } else {
        reject(`错误的响应码:${respInfo.statusCode}`);
      }
    });
  });
}
export default refreshUrls;
