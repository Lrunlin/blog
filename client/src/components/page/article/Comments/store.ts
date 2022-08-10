import { atom } from "recoil";

// 被激活的表情选择器
const commentEmojiActiveContext = atom<string|number>({
  key: "comment-emoji-active",
  default: "",
});
export { commentEmojiActiveContext };
