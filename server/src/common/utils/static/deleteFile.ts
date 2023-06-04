import qiniu from "qiniu";
import bucketManager from "./utils/bucketManager";

function deleteFile(images: string[]) {
  images = images.slice(0, 1000);
  const deleteOperations = images.map(item => {
    return qiniu.rs.deleteOp(process.env.OSS_NAME, item);
  });
  return new Promise((success, error) => {
    bucketManager.batch(deleteOperations, function (err, respBody, respInfo) {
      if (err) {
        error("删除错误：" + err);
      } else {
        if (respInfo.statusCode == 200) {
          success("全部成功");
        } else if (respInfo.statusCode == 298) {
          error(
            `删除文件错误:${respBody.filter((item: any) => item.code == 200).length}/${
              images.length
            }`
          );
        } else {
          error("删除错误");
        }
      }
    });
  });
}
export default deleteFile;
