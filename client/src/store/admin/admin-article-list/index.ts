import { create } from "zustand";

const initValues = {
  list: [] as any[],
  total_count: 0,
};

type actionType = {
  setData: (data: typeof initValues) => any;
};

const useAdminArticleList = create<{ data: typeof initValues } & actionType>(
  (set) => ({
    data: initValues,
    setData: (data: typeof initValues) => set(() => ({ data: data })),
  }),
);
export default useAdminArticleList;
