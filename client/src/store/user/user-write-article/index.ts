import { create } from "zustand";

export const initValue = {
  title: "",
  content: "",
  tag: [] as number[],
  reprint: null as null | string,
  description: null as null | string,
  cover_file_name: null as null | string,
  cover_url: null as null | string,
  theme_id: 0,
};

type dataType = typeof initValue;

type actionType = {
  setArticleData: (data: dataType) => void;
  resetData: () => void;
  updateData: (data: Partial<dataType>) => void;
};

/** 更新用户端文章编辑数据 */
const useUserWriteArticle = create<{ data: dataType } & actionType>((set) => ({
  data: initValue,
  /** 更新整体对象 */
  setArticleData: (data: dataType) => set({ data: data }),
  /** 重置文章数据 */
  resetData: () => set({ data: initValue }),
  /** 更新单一属性 */
  updateData: (state: Partial<dataType>) =>
    set((s) => {
      return { data: { ...s.data, ...state } };
    }),
}));

export default useUserWriteArticle;
