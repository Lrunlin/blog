//文章表中的tag转移到article-tag 同时修改表结构
//处理article-tag数据库后在创建一个数据库(A) 利用Navicat进行结构同步 源为A 目标位blog

const mysql = require("mysql2/promise");
const db = mysql.createPool({
  database: "blog",
  user: "root",
  password: "123456",
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const BaseTime = +new Date("2025-1-1");
let lastTimeTick;
let lastRandomNumberTick = random(1, 3);
function uuid() {
  let timestamp = +new Date() - BaseTime;
  lastRandomNumberTick =
    timestamp == lastTimeTick ? ++lastRandomNumberTick : random(0, 3);
  lastTimeTick = timestamp;

  return +`${timestamp}${random(0, 9)}${lastRandomNumberTick}`;
}

let i = 0;
(async () => {
  // 建表
  try {
    await db.query(`CREATE TABLE \`article_tag\`  (
  \`id\` bigint NOT NULL COMMENT '记录ID',
  \`article_id\` bigint NOT NULL COMMENT '文章ID',
  \`tag_id\` bigint NOT NULL COMMENT '标签ID',
  PRIMARY KEY (\`id\`) USING BTREE,
  INDEX \`article_id\`(\`article_id\`) USING BTREE,
  INDEX \`tag_id\`(\`tag_id\`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = FIXED;`);
  } catch (error) {}

  // 处理文章
  let [rows] = await db.query("SELECT id,tag FROM article");
  for (let index = 0; index < rows.length; index++) {
    const item = rows[index];
    const { id, tag } = item;
    const tags = tag.split(",");
    for (let index = 0; index < tags.length; index++) {
      const tag = tags[index];
      await db.query(
        "INSERT INTO article_tag(id,belong_id, tag_id,type) VALUES(?,?, ?,'article')",
        [uuid(), id, tag],
      );
    }
    i++;
    console.log("文章:", i);
  }

  // 处理文章
  let [problem] = await db.query("SELECT id,tag FROM problem");
  for (let index = 0; index < problem.length; index++) {
    const item = problem[index];
    const { id, tag } = item;
    const tags = tag.split(",");
    for (let index = 0; index < tags.length; index++) {
      const tag = tags[index];
      await db.query(
        "INSERT INTO article_tag(id,belong_id, tag_id,type) VALUES(?,?, ?,'problem')",
        [uuid(), id, tag],
      );
    }
    i++;
    console.log("问题:", i);
  }

  try {
  } catch (error) {}
})();
