import bucketManager from "./utils/bucketManager";

let listPrefix = (prefix: string, marker?: string): Promise<{ items: any[]; marker?: string }> =>
  new Promise((resolve, reject) => {
    bucketManager.listPrefix(
      process.env.OSS_BUCKET,
      {
        limit: 1000,
        prefix: `${prefix}/`,
        marker: marker,
      },
      function (err, respBody, respInfo) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve({ items: respBody.items, marker: respBody.marker });
      }
    );
  });
export default listPrefix;
