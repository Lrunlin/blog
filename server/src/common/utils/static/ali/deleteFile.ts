import aliOSS from "./utils/oss";

function deleteFile(images: string[]) {
  images = images.slice(0, 1000);

  return new Promise(async (success, error) => {
    aliOSS
      .deleteMulti(images, {
        quiet: true,
      })
      .then(res => {
        success(res);
      })
      .catch(err => {
        error(err);
      });
  });
}
export default deleteFile;
