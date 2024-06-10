import aliOSS from "./utils/oss";

let listPrefix = (prefix: string, marker?: string): Promise<{ items: any[]; marker?: string }> =>
  new Promise(async (resolve, reject) => {
    await aliOSS
      .list({ prefix: `${prefix}/`, marker: marker, "max-keys": 1000 }, {})
      .then(res => {
        resolve({
          items: res.objects.map(item => ({
            key: item.name.replace(`${prefix}/`, ""),
            create_time: new Date(item.lastModified),
          })),
          marker: res.nextMarker,
        });
      })
      .catch(err => {
        reject();
      });
  });
export default listPrefix;
