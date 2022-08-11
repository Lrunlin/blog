import type { ArticleAttributes } from "@/db/models/init-models";

/**
 * 热度优先
 */
function hottest(data: ArticleAttributes[]) {
  return data.sort((a, b) => {
    let _a: number =
      a.view_count * 1.1 + (a as any).comment_count * 1.3 + (a as any).collection_count * 1.5;
    let _b: number =
      b.view_count * 1.1 + (b as any).comment_count * 1.3 + (b as any).collection_count * 1.5;
    if ((a.update_time || a.create_time) > (b.update_time || b.create_time)) {
      _a += 10;
    } else {
      _b += 10;
    }
    return _b - _a;
  });
}
export default hottest;
