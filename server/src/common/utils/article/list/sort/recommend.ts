import type { ArticleAttributes } from "@/db/models/init-models";

/**
 * 综合收藏、阅读、评论的个数来排序
 */
function recommend(data: ArticleAttributes[]) {
  return data.sort((a, b) => {
    let _a: number = a.view_count + (a as any).comment_count + (a as any).collection_count;
    let _b: number = b.view_count + (b as any).comment_count + (b as any).collection_count;
    if ((a.update_time || a.create_time) > (b.update_time || b.create_time)) {
      _a += 100;
    } else {
      _b += 100;
    }
    return _b - _a;
  });
}
export default recommend;
