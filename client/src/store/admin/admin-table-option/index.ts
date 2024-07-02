import { create } from "zustand";

const initValues = {
  key: 0, //用于刷新表格
  page:
    typeof window != "undefined" && !isNaN(+window?.sessionStorage.page)
      ? +window?.sessionStorage.page
      : 1,
  page_size:
    typeof window != "undefined" && !isNaN(+window?.sessionStorage.page_size)
      ? +window?.sessionStorage.page_size
      : 10,
};

type actionType = {
  setData: (data: typeof initValues) => any;
};

const useAdminTableOption = create<{ data: typeof initValues } & actionType>(
  (set) => ({
    data: initValues,
    setData: (data: typeof initValues) => set(() => ({ data: data })),
  }),
);
export default useAdminTableOption;
