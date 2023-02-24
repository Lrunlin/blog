import { NoticeAttributes } from "@/db/models/notice";
import switchNoticeCommentArticle from "./comment/comment-article";
import switchNoticeCommentProblem from "./comment/comment-problem";
import switchNoticeCommentAnswer from "./comment/comment-answer";
import switchNoticeAnswer from "./answer";
import switchNoticeFollowProblem from "./follow/follow-problem";
import switchNoticeFollowArtocle from "./follow/follow-article";

let _switch = {
  // 评论相关
  comment_article: switchNoticeCommentArticle,
  comment_article_reply: switchNoticeCommentArticle,
  comment_problem: switchNoticeCommentProblem,
  comment_problem_reply: switchNoticeCommentProblem,
  comment_answer: switchNoticeCommentAnswer,
  comment_answer_reply: switchNoticeCommentAnswer,
  //有人回答他提的问题
  answer: switchNoticeAnswer,
  follow_problem: switchNoticeFollowProblem,
  follow_article: switchNoticeFollowArtocle,
};

/**
 * 将数据库中查询的通知数据转为用户端使用的数据
 * @params data {Notice[]} 通知数据
 */
function switchList(data: NoticeAttributes[]) {
  // 对应的类型生成一个数组，然后promise.all
  return Promise.all(
    data
      .map(item => {
        return _switch[item.type as keyof typeof _switch](item);
      })
      .filter(item => item)
  )
    .then(rows => {
      return rows.filter(item => item);
    })
    .catch(() => {
      return [];
    });
}
export default switchList;
