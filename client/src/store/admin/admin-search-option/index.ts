import { create } from "zustand";

const initValues = {
  /** 发布人 管理员或者用户*/
  auth: undefined,
  /** 设置正序还是倒序*/
  sort: ["create_time", "desc"],
  /** 时间线，查询某某之后create_time的文章*/
  deadline: undefined,
  /** 根据ID进行查询*/
  article_id: undefined,
  /** 发布者ID*/
  author_id: undefined,
  /** 是否仅原创文章*/
  only_original: undefined,
};

type actionType = {
  setData: (data: typeof initValues) => any;
};

const useAdminArticleSearch = create<{ data: typeof initValues } & actionType>(
  (set) => ({
    data: initValues,
    setData: (data: typeof initValues) => set(() => ({ data: data })),
  }),
);
export default useAdminArticleSearch;
