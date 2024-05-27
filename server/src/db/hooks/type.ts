import { setData } from "@/common/modules/cache/type";
import type { Tag, TagAttributes } from "../models/init-models";
import init from "./utils/init";

// 只要有变化就刷新缓存
export default init<Tag, TagAttributes>(async (model, type) => {
  setData();
});
