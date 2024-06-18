import redis from "@/common/utils/redis";
import DB from "@/db";
import type { UserAttributes } from "@/db/models/user";
import Sequelize from "@/db/config";
import moment from "moment";

async function setRankingData() {
  // 粉丝榜
  const funs = await DB.User.findAll({
    offset: 0,
    limit: 5,
    order: [["funs_count", "desc"]],
    attributes: [
      "id",
      "name",
      "auth",
      "avatar_file_name",
      "avatar_url",
      "description",
      "unit",
      "location",
      [
        Sequelize.literal(
          `(SELECT count(id) FROM follow WHERE user.id = follow.belong_id and type="user")`
        ),
        "funs_count",
      ],
    ],
    where: { state: 1 },
  })
    .then(rows => {
      type userType = UserAttributes & { funs_count: number };
      return rows.filter(item => {
        return !!(item.toJSON() as userType).funs_count;
      });
    })
    .catch(e => {
      console.log(e);
      return [];
    });
  // 作者榜
  let time = moment(+new Date() - 604_800_000).format("YYYY-MM-DD HH:mm:ss");
  let author = await DB.User.findAll({
    attributes: [
      "id",
      "name",
      "auth",
      "avatar_file_name",
      "avatar_url",
      "description",
      "unit",
      "location",
      // 根据7日内发布的文章数量排序
      [
        Sequelize.literal(
          `(select count(id) from article where article.author=user.id and article.state=1 and article.create_time>"${time}")`
        ),
        "article_count",
      ],
    ],
    offset: 0,
    limit: 5,
    order: [["article_count", "desc"]],
    where: { state: 1 },
  })
    .then(rows => rows)
    .catch(() => []);

  redis.set("ranking-author", JSON.stringify(author));
  redis.set("ranking-funs", JSON.stringify(funs));
}
export default () => {
  setRankingData();
  setInterval(() => {
    setRankingData();
  }, 3_600_000);
};
