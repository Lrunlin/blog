import Joi from "joi";
import { TagAttributes } from "@/db/models/init-models";
import { cache } from "@/common/modules/cache/type";

/** 上传图片验证配置(允许null)*/
const tag = Joi.array()
  .items(Joi.number().required())
  .min(1)
  .max(6)
  .required()
  .error(new Error("网站标签为1-6个"))
  .custom((value: number[], helper) => {
    if (new Set(value).size != value.length) {
      return helper.message(new Error("禁止重复的tag_id") as any);
    }

    let tag = (cache.get("tag") as Array<TagAttributes>).map((item) => item.id);

    if (value.every((item) => tag.includes(item))) {
      return true;
    } else {
      return helper.message(new Error("tag_id不在数据表内") as any);
    }
  });

export default tag;
