import { useState, useMemo } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { writeArticleContext } from "./index";
import axios from "axios";

const DraftsButton = () => {
  let { title, description, cover_file_name, reprint, content, tag } =
    useRecoilValue(writeArticleContext);
  let resetArticleData = useResetRecoilState(writeArticleContext);

  let router = useRouter();

  let isDisabled = useMemo(() => {
    return !/^[\s\S]*.*[^\s][\s\S]*$/.test(title) || title.length > 50 || content.length < 20;
  }, [title, content]);
  let [isLoad, setIsLoad] = useState(false);

  function createDrafts() {
    if (isDisabled) {
      return;
    }
    setIsLoad(true);
    axios
      .post("/article", {
        title: /^[\s\S]*.*[^\s][\s\S]*$/.test(title) ? title : "无标题",
        description,
        cover_file_name,
        reprint,
        content,
        tag,
        state: 0,
      })
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

  function updateDrafts() {
    if (isDisabled) {
      return;
    }
    setIsLoad(true);
    axios
      .put(`/article/${router.query.id}`, {
        title: /^[\s\S]*.*[^\s][\s\S]*$/.test(title) ? title : "无标题",
        description,
        cover_file_name,
        reprint,
        content,
        tag,
        state: 0,
      })
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
        onClick={router.route == "/write" ? createDrafts : updateDrafts}
        disabled={isDisabled}
        loading={isLoad}
      >
        保存至草稿箱
      </Button>
    </>
  );
};
export default DraftsButton;
