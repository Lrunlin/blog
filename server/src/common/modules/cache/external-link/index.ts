import DB from "@/db";
import { ExternalLinkAttributes } from "@/db/models/external_link";
import { LRUCache } from "lru-cache";

/**
 * 存储外链列表
 */
const cache = new LRUCache<"list", ExternalLinkAttributes["href"][]>({
  max: 20,
});

/** 刷新缓存数据*/
function setData() {
  DB.ExternalLink.findAll({ raw: true }).then(rows => {
    cache.set(
      "list",
      rows.map(item => item.href)
    );
  });
}

setTimeout(() => {
  setData();
}, 0);

function getData() {
  return cache.get("list");
}

export default cache;
export { getData, setData, cache };
