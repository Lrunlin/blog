import mcache from "memory-cache";
/**
 * sequelize中的Hooks函数，用于在数据表变化时清除缓存
 */
const cache = {
  afterCreate() {
    mcache.clear();
  },
  afterBulkUpdate() {
    mcache.clear();
  },
  afterBulkDestroy() {
    mcache.clear();
  },
};
export default cache;
