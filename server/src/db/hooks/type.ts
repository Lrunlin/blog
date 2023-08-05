import { setData } from "@/common/modules/cache/type";
import type { Type, Tag, TypeAttributes, TagAttributes } from "../models/init-models";
import init from "./utils/init";

// 只要有变化就刷新缓存
export default init<Type | Tag, TypeAttributes | TagAttributes>(async (model, type) => {
  setData();
});
