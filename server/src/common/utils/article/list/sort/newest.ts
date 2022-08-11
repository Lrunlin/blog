import type { ArticleAttributes } from "@/db/models/init-models";

/**
 * 发布顺序优先
 */
function newest(data: ArticleAttributes[]) {
  return data.sort((a, b) => {
    let _a: number = a.view_count * 0.8 + (a as any).comment_count + (a as any).collection_count;
    let _b: number = b.view_count * 0.8 + (b as any).comment_count + (b as any).collection_count;
    if ((a.update_time || a.create_time) > (b.update_time || b.create_time)) {
      _a += 120;
    } else {
      _b += 120;
    }
    return _b - _a;
  });
}
export default newest;
