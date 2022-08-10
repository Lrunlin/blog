import { getData } from "@/common/modules/cache/type";
import type { DestroyOptions } from "sequelize";
import type { TypeAttributes,TagAttributes } from "../models/init-models";
/**
 * sequelize中的Hooks函数，用于在数据表变化时清除缓存
 */
const hooks = {
  afterCreate() {
    getData();
  },
  afterBulkUpdate() {
    getData();
  },
  afterBulkDestroy(options: DestroyOptions<TypeAttributes | TagAttributes>) {
    //判断是否使用了事务处理，如果是就等事务提交之后再执行
    if (options.transaction) {
      options.transaction?.afterCommit(() => {
        getData();
      });
    } else {
      getData();
    }
  },
};
export default hooks;
