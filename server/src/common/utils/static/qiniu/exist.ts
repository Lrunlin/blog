import qiniu from "qiniu";
import bucketManager from "./utils/bucketManager";

/**
 * 传递多张图片，判断
 */
async function exist(
  images: string[],
): Promise<{ success: boolean; message: string }> {
  let statOperations = images.map((item) =>
    qiniu.rs.statOp(process.env.OSS_BUCKET, item),
  );

  return bucketManager
    .batch(statOperations)
    .then(({ data, resp }) => {
      if (Math.floor(resp.statusCode! / 100) === 2) {
        if (resp.statusCode === 200) {
          return { success: true, message: "成功" };
        } else {
          return {
            success: false,
            message: `有${data.reduce((total, item) => {
              if (item.code != 200) {
                return (total += 1);
              } else {
                return total;
              }
            }, 0)}个文件不在文件系统内，请检查`,
          };
        }
      } else {
        return {
          success: false,
          message: "文件系统响应失败，建议您先将文章保存在草稿箱，稍后在试。",
        };
      }
    })
    .catch((err) => {
      console.log(err);
      return {
        success: false,
        message: "文件系统响应失败，建议您先将文章保存在草稿箱，稍后在试。",
      };
    });
}

export default exist;
