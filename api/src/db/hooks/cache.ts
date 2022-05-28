import mcache from "memory-cache";
/**
 * sequelize中的Hooks函数，用于在数据表变化时清除缓存
 */
const cache = {
  afterCreate() {
    mcache.clear();
    console.log(mcache.size());
  },
  afterBulkUpdate() {
    mcache.clear();
    console.log('put:',mcache.size());
  },
  afterBulkDestroy() {
    mcache.clear();
    console.log(mcache.size());
  },
};
export default cache;
