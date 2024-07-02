import axios from "axios";

function imageInfo(
  fileName: string,
): Promise<{ width: number; height: number; size: number }> {
  let url = `${process.env.CDN}${fileName}?imageInfo`;
  return new Promise(async (success, error) => {
    axios
      .get(url)
      .then((res) => {
        let { width, height, size } = res.data;
        if (width && height && size) {
          success({ width, height, size });
        } else {
          error("获取推广图片宽高错误:" + url);
        }
      })
      .catch((err) => {
        error(err);
      });
  });
}

export default imageInfo;
