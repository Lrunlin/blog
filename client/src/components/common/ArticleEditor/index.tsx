"use client";

import { useEffect } from "react";
import { FC, ReactNode } from "react";
import { Avatar, Button, Dropdown, Input, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Base from "@/layout/Base";
import Head from "@/components/next/Head";
import useUserData from "@/store/user/user-data";
import useUserWriteArticle from "@/store/user/user-write-article";
import Editor from "../Editor";
import DraftsButton from "./DraftsButton";
import Modal from "./Modal";

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

type articleContextType = typeof initValue;
type articleDataType = Omit<articleContextType, "coverUrl">;
/** 用于和服务器交互的当前文章参数*/
type articleParamsType = articleDataType & {
  cover_file_name: articleContextType["cover_file_name"];
};
interface propsType {
  /** Head组件*/
  meta: ReactNode;
  /** 提交事件*/
  submit: (values: articleParamsType) => void;
  /** 是否展示保存草稿箱按钮*/
  showDraftsButton?: boolean;
}
export type modalPropsType = Pick<propsType, "submit">;
const ArticleEditor: FC<propsType> = (props) => {
  let userData = useUserData((s) => s.data);
  let articleData = useUserWriteArticle((s) => s.data);
  let updateData = useUserWriteArticle((s) => s.updateData);
  let resetArticleData = useUserWriteArticle((s) => s.resetData);

  useEffect(() => {
    return () => {
      resetArticleData();
    };
  }, [resetArticleData]);

  return userData ? (
    <div className="w-full">
      {props.meta}
      <header className="flex h-12 items-center justify-between">
        <Input
          placeholder="输入文章标题..."
          value={articleData.title}
          variant="borderless"
          className="mr-10 h-full"
          onChange={(e) => updateData({ title: e.target.value })}
          maxLength={200}
        />
        <div className="mr-5 flex">
          {props.showDraftsButton && <DraftsButton />}
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => <Modal {...props} />}
          >
            <Button type="primary" className="mx-4">
              发布
            </Button>
          </Dropdown>
          <Avatar src={userData.avatar_url} alt="头像" />
        </div>
      </header>
      <Editor
        theme={true}
        target="article"
        initValue={articleData.content}
        onChange={(html) => updateData({ content: html })}
        defaultTheme={articleData.theme_id}
        onSetTheme={(id) => updateData({ theme_id: id })}
      />
    </div>
  ) : (
    <Base className="bg-white">
      <div className="flex w-full justify-center">
        <Head title="请登录" />
        <Result icon={<SmileOutlined />} title="请登录后再发布文章" />
      </div>
    </Base>
  );
};
export default ArticleEditor;
