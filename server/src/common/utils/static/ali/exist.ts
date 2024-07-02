import aliOSS from "./utils/oss";

async function exist(
  images: string[],
): Promise<{ success: boolean; message: string }> {
  return new Promise(async (resolve, reject) => {
    await Promise.all(
      images.map((item) =>
        aliOSS
          .head(item)
          .then((res) => true)
          .catch((err) => false),
      ),
    )
      .then((res) => {
        if (res.some((item) => item == false)) {
          resolve({
            success: false,
            message: `有${res.reduce((total, item) => {
              if (!item) {
                return (total += 1);
              } else {
                return total;
              }
            }, 0)}个文件不在文件系统内，请检查`,
          });
        } else {
          resolve({ success: true, message: "成功" });
        }
      })
      .catch((err) => {
        reject({
          success: false,
          message: "文件系统响应失败，请稍后在试。",
        });
      });
  });
}

export default exist;
