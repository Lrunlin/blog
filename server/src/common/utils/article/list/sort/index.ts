// 传递排序方式的字符串，自动使用排序函数排序
import hottest from "./hottest";
import newest from "./newest";
import recommend from "./recommend";
import type { ArticleAttributes } from "@/db/models/init-models";

const mapping = {
  recommend,
  newest,
  hottest,
};
function sort(modthod: "recommend" | "newest" | "hottest", data: ArticleAttributes[]) {
  return mapping[modthod](data);
}
export default sort;
