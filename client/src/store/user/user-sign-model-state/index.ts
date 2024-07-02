import { create } from "zustand";
import { componentsList } from "@/components/common/Header/Sign";

type dataType = false | keyof typeof componentsList;

type actionType = {
  setData: (data: dataType) => any;
};

/** 弹窗组件显示的状态管理管理*/
const useUserSignModel = create<{ data: dataType } & actionType>((set) => ({
  data: false,
  setData: (data: dataType) => set({ data: data }),
}));
export default useUserSignModel;
