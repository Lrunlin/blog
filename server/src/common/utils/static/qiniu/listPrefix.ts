import bucketManager from "./utils/bucketManager";

let listPrefix = (
  prefix: string,
  marker?: string,
): Promise<{ items: any[]; marker?: string }> =>
  bucketManager
    .listPrefix(process.env.OSS_BUCKET, {
      limit: 1000,
      prefix: `${prefix}/`,
      marker: marker,
    })
    .then(({ data, resp }) => {
      return {
        items: data.items.map((item: any) => ({
          key: item.key.replace(`${prefix}/`, ""),
          create_time: new Date(item.putTime / 10000),
        })),
        marker: data.marker,
      };
    })
    .catch((err) => err);

export default listPrefix;
