import { useEffect } from "react";
import { Button, Input, Avatar, Dropdown, Result } from "antd";
import Editor from "../Editor";
import { userDataContext, UserStateAttributes } from "@/store/user-data";
import { atom, useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import Modal from "./Modal";
import DraftsButton from "./DraftsButton";
import { SmileOutlined } from "@ant-design/icons";
import Head from "@/components/next/Head";
import { FC, ReactNode } from "react";
import Base from "@/layout/Base";

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

export const writeArticleContext = atom({
  key: "write-article-data",
  default: initValue,
});

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
const ArticleEditor: FC<propsType> = props => {
  let userData = useRecoilValue(userDataContext) as UserStateAttributes;
  let [articleData, setArticleData] = useRecoilState(writeArticleContext);
  let resetArticleData = useResetRecoilState(writeArticleContext);
  useEffect(() => {
    return () => {
      resetArticleData();
    };
  }, [resetArticleData]);

  return userData ? (
    <div className="w-full">
      {props.meta}
      <header className="h-12 flex justify-between items-center">
        <Input
          placeholder="输入文章标题..."
          value={articleData.title}
          bordered={false}
          className="mr-10 h-full"
          onChange={e => setArticleData(_data => ({ ..._data, title: e.target.value }))}
          maxLength={200}
        />
        <div className="flex mr-5">
          {props.showDraftsButton && <DraftsButton />}
          <Dropdown trigger={["click"]} dropdownRender={() => <Modal {...props} />}>
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
        onChange={html => {
          setArticleData(_data => ({ ..._data, content: html }));
        }}
        defaultTheme={articleData.theme_id}
        onSetTheme={id =>
          setArticleData(_data => {
            console.log(id);
            return { ..._data, theme_id: id };
          })
        }
      />
    </div>
  ) : (
    <Base className="bg-white">
      <div className="w-full flex justify-center">
        <Head title="请登录" />
        <Result icon={<SmileOutlined />} title="请登录后再发布文章" />
      </div>
    </Base>
  );
};
export default ArticleEditor;
