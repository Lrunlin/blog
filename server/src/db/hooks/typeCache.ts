import { getData } from "@/modules/cache/type";
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
  afterBulkDestroy() {
    getData();
  },
};
export default hooks;
