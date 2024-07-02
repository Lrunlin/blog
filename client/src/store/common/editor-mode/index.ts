import { create } from "zustand";

type dataType = "markdown" | "rich-text";

type actionType = {
  setData: (data: dataType) => any;
};

/** 文章编辑器切换*/
const useEditorMode = create<{ data: dataType } & actionType>((set) => ({
  data: (typeof window != "undefined"
    ? window.localStorage.getItem("editor-mode") || "markdown"
    : "markdown") as dataType,
  setData: (data: dataType) => set({ data: data }),
}));
export default useEditorMode;
