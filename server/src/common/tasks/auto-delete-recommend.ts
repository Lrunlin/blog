import sequelize from "@/db/config";

/** 删除推荐表中存在但是文章表中不存在的数据*/
//?管理员有手动删除文章表中数据的可能
async function autoDeleteRecommend() {
  await sequelize.query(`
     DELETE
FROM recommend
WHERE NOT EXISTS (
  SELECT 1
  FROM article
  WHERE article.id = recommend.id
);
    `);
}

export default () => {
  autoDeleteRecommend();
  setInterval(() => {
    autoDeleteRecommend();
  }, 3_600_000);
};
