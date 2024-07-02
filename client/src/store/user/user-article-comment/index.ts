import { articleCommentType } from "@type/model/article-comment";
import { create } from "zustand";

const initValue: {
  activeEmojiID: null | string | number;
  activeInputID: null | string | number;
  list: articleCommentType[] | null;
} = {
  activeEmojiID: null,
  activeInputID: null,
  list: null,
};
type actionType = {
  setData: (
    data: Partial<{ [K in keyof typeof initValue]: (typeof initValue)[K] }>,
  ) => any;
};

/** 文章评论编辑*/
const useUserArticleComment = create<
  {
    data: typeof initValue;
  } & actionType
>((set) => ({
  data: initValue,
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
}));
export default useUserArticleComment;
