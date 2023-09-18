import qiniu from "qiniu";
import bucketManager from "./utils/bucketManager";

/**
 * 传递多张图片，判断
 */
async function exist(images: string[]): Promise<{ success: boolean; message: string }> {
  let statOperations = images.map(item => qiniu.rs.statOp(process.env.OSS_NAME, item));

  return new Promise((resolve, reject) => {
    bucketManager.batch(statOperations, function (err, respBody: any[], respInfo) {
      if (err) {
        reject({
          success: false,
          message: "文件系统响应失败，建议您先将文章保存在草稿箱，稍后在试。",
        });
        console.log(err);
      } else {
        if (respInfo.statusCode == 200) {
          resolve({ success: true, message: "成功" });
        } else if (respInfo.statusCode == 298) {
          resolve({
            success: false,
            message: `有${respBody.reduce((total, item) => {
              if (item.code != 200) {
                return (total += 1);
              } else {
                return total;
              }
            }, 0)}个文件不在文件系统内，请检查`,
          });
        } else {
          reject({
            success: false,
            message: "文件系统响应失败，建议您先将文章保存在草稿箱，稍后在试。",
          });
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      }
    });
  });
}
export default exist;
