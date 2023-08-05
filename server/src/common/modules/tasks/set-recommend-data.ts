import getSortArticleList, { sortArticleListType } from "./sortArticleList";
import DB from "@/db";
import { Op } from "sequelize";
import sleep from "@/common/utils/sleep";
import sequelize from "@/db/config";
import { Literal } from "sequelize/types/utils";
import { Article, ArticleAttributes } from "@/db/models/init-models";

const random = (min: number, max: number) => Math.random() * (max - min) + min;

/** 限制文章发布和更新时间*/
let articleTimeWhere = {
  state: 1,
  // 要求更新文章推荐表时，不存储2小时内发布或者被更新的文章
  create_time: { [Op.lt]: new Date(+new Date() - 7_200_000) },
  [Op.or]: [
    { update_time: null as any },
    { update_time: { [Op.lt]: new Date(+new Date() - 7_200_000) } },
  ],
};

// 设置一个变量用来存储数据标准
let dataStandards = {
  like_count: [] as number[],
  comment_count: [] as number[],
  view_count: [] as number[],
  // create_time: [] as string[],
  id: [] as number[],
  collection_count: [] as number[],
};

let condition: {
  key: keyof typeof dataStandards;
  value: [Literal, keyof typeof dataStandards] | string;
  importance: { recommend: number; newest: number; hottest: number };
}[] = [
  {
    key: "comment_count",
    value: [
      sequelize.literal(
        `(SELECT COUNT(id) FROM comment WHERE comment.belong_id = article.id and type="article")`
      ),
      "comment_count",
    ],
    importance: { recommend: 3, newest: 1, hottest: 4 },
  },
  {
    key: "like_count",
    value: [
      sequelize.literal(`(SELECT COUNT(id) FROM likes WHERE likes.belong_id = article.id)`),
      "like_count",
    ],
    importance: { recommend: 3.5, newest: 1, hottest: 4.5 },
  },
  {
    key: "view_count",
    value: "view_count",
    importance: { recommend: 1.5, newest: 1, hottest: 2.5 },
  },
  {
    // key: "create_time",
    // value: "create_time",
    key: "id",
    value: "id",
    importance: { recommend: 1.5, newest: 4, hottest: 1.5 },
  },
  {
    key: "collection_count",
    value: [
      sequelize.literal(
        `(SELECT COUNT(id) FROM collection WHERE collection.belong_id = article.id)`
      ),
      "collection_count",
    ],
    importance: { recommend: 3.5, newest: 1, hottest: 4.5 },
  },
];

// 用于forEach循环
const percentages = new Array(10).fill(null).map((_, index) => index * 10);

/** 初始化站内文章数据*/
async function init() {
  /** 文章总数*/
  let articleCount = await DB.Article.count({ where: articleTimeWhere });
  percentages.forEach(async (weight, index) => {
    condition.forEach(async item => {
      await DB.Article.findOne({
        offset: Math.ceil((articleCount / 100) * weight),
        where: articleTimeWhere,
        attributes: [item.value],
        raw: true,
        order: [[item.key, "desc"]],
      }).then(row => {
        if (row) {
          let value = (row as Article)[item.key as keyof ArticleAttributes] as string | number;
          dataStandards[item.key][index] = value as number;
        }
      });
    });
  });
}

/** 首次启动。根据页数获取推荐文章，并且全部写入redis（{sort}-{id}）*/
export const setArticleListWrite = async () => {
  await init();

  let articleCount = await DB.Article.count({ where: articleTimeWhere });

  let round = Math.ceil(articleCount / 1000) + 1;

  for (let page = 1; page < round; page++) {
    let list = await getSortArticleList(page).then(rows =>
      rows.map(item => ({
        ...item,
        ...calculateGrades({ ...item.view, id: item.id }),
      }))
    );

    DB.Recommend.bulkCreate(list, {
      updateOnDuplicate: [
        "title",
        "description",
        "cover",
        "tag",
        "create_time",
        "update_time",
        "view",
        "recommend",
        "newest",
        "hottest",
      ],
    }).catch(err => {
      console.log("更新推荐表,批量文章插入发生错误", err);
    });

    await sleep(50);
  }
};
/** 传入文章信息，返回文章分数*/
function calculateGrades(option: sortArticleListType["view"] & Pick<sortArticleListType, "id">) {
  let [recommend, newest, hottest]: ["recommend", "newest", "hottest"] | [number, number, number] =
    ["recommend", "newest", "hottest"].map(sort => {
      let score = random(0, 20);
      let key: keyof typeof option;
      for (key in option) {
        const value = option[key];
        let _score =
          (10 - dataStandards[key].findIndex(item => item <= value)) *
          (condition.find(item => item.key == key) as (typeof condition)[0]).importance[
            sort as "recommend" | "newest" | "hottest"
          ] *
          +random(0.7, 1.3).toFixed(2);
        score += _score;
      }
      return Math.floor(score); //取整 要int类型存储
    }) as [number, number, number];
  return { recommend, newest, hottest };
}
