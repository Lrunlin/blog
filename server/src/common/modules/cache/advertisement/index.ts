import DB from "@/db";
import redis from "@/common/utils/redis";
import { imageInfo } from "@/common/utils/static";

/** 刷新缓存数据*/
function setData() {
  DB.Advertisement.findAll({
    attributes: ["id", "poster_file_name", "poster_url", "url", "position"],
  }).then(async (rows) => {
    let data = rows.map((item) => item.toJSON());
    let list: any = {};
    for (let index = 0; index < data.length; index++) {
      const item = data[index];

      await imageInfo(`/advertisement/${item.poster_file_name}`)
        .then(({ width, height }) => {
          let itemData = {
            id: item.id,
            poster_url: (item as any).poster_url,
            url: item.url,
            image_size: { width, height },
          };
          if (list[item.position]) {
            list[item.position].push(itemData);
          } else {
            list[item.position] = [itemData];
          }
        })
        .catch((err) => {
          if (process.env.ENV == "production") {
            console.log(
              "推广海报图片信息获取错误:",
              item.id,
              item.poster_file_name,
            );
          }
        });
    }

    for (let key in list) {
      let value = list[key];
      redis.set(`advertisement-list-${key}`, JSON.stringify(value));
    }
  });
}

type ListKey = "index" | "creator" | "article";
type AllKey = undefined;

type KeyType<T extends "list" | "all"> = T extends "list" ? ListKey : AllKey;

async function getData<T extends "list" | "all">(type: T, key: KeyType<T>) {
  if (type == "all") {
    return await DB.Advertisement.findAll({ order: [["indexes", "asc"]] })
      .then((rows) => rows)
      .catch((err) => {
        console.log(err);
        return [];
      });
  } else {
    let data = JSON.parse(
      (await redis.get(`advertisement-list-${key}`)) || "[]",
    );
    return data;
  }
}

export { getData, setData };
