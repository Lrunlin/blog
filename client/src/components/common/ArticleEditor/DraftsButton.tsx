import { useState, useMemo } from "react";
import { Button, message } from "antd";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { writeArticleContext } from "./index";
import axios from "axios";

const DraftsButton = () => {

  let { title, content } = useRecoilValue(writeArticleContext);
  let resetArticleData = useResetRecoilState(writeArticleContext);
  let isDisabled = useMemo(() => {
    return !/^[\s\S]*.*[^\s][\s\S]*$/.test(title) || title.length > 15 || content.length < 20;
  }, [title, content]);
  let [isLoad, setIsLoad] = useState(false);
  function createDrafts() {
    if (isDisabled) {
      return;
    }
    setIsLoad(true);
    axios
      .post("/drafts", { title: title, content: content })
      .then(res => {
        if (res.data.success) {
          resetArticleData();
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setIsLoad(false));
  }
  return (
    <>
      <Button
        ghost
        type="primary"
        onClick={() => createDrafts()}
        disabled={isDisabled}
        loading={isLoad}
      >
        保存至草稿箱
      </Button>
    </>
  );
};
export default DraftsButton;
