import qiniu from "qiniu";
import bucketManager from "./utils/bucketManager";

function deleteFile(images: string[]) {
  images = images.slice(0, 100);

  const deleteOperations = images.map((item) => {
    return qiniu.rs.deleteOp(process.env.OSS_BUCKET, item);
  });
  return bucketManager
    .batch(deleteOperations)
    .then(({ data, resp }) => {
      if (Math.floor(resp.statusCode! / 100) === 2) {
        data.forEach(function (item) {
          if (item.code === 200) {
            return "全部成功";
          } else {
            return `删除文件错误:${data.filter((item) => item.code == 200).length}/${
              images.length
            }`;
          }
        });
      } else {
        return `删除错误`;
      }
    })
    .catch((err) => `删除错误: ${err}`);
}
export default deleteFile;
