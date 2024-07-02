import { FC, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import useUserWriteArticle from "@/store/user/user-write-article";
import type { modalPropsType } from "../index";
import Cover from "./Cover";
import Reprint from "./Reprint";
import Type from "./Type";

const Modal: FC<modalPropsType> = (props) => {
  let { TextArea } = Input;
  let { Item, useForm } = Form;
  let articleData = useUserWriteArticle((s) => s.data);
  let updateData = useUserWriteArticle((s) => s.updateData);

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(Object.assign({}, articleData));
  }, [articleData]);

  return (
    <div className="w-[560px] rounded-sm border border-solid border-stone-300 bg-white">
      <div className="border-b-solid flex h-16 items-center border-slate-200">
        <span className="ml-5 text-lg">发布文章</span>
      </div>
      <div>
        <Form
          labelCol={{ span: 3, offset: 2 }}
          className="!ml-5 !mt-2"
          initialValues={articleData}
          form={form}
          onFinishFailed={({ errorFields }) => {
            if (errorFields.length) {
              message.warning(errorFields[0].errors[0]);
            }
          }}
          onFinish={props.submit}
        >
          <Item name="theme_id" hidden rules={[{ required: true }]}>
            <></>
          </Item>
          <Item
            name="title"
            hidden
            rules={[
              { required: true, message: "请填写标题" },
              { min: 3, max: 200, message: "标题字数为3-200" },
            ]}
            children={<div></div>}
          />
          <Item
            name="content"
            hidden
            rules={[
              { required: true, message: "请填写文章内容" },
              { min: 20, message: "内容最少20字符" },
            ]}
            children={<div></div>}
          />

          <Item
            label="标签"
            required
            name="tag"
            help={null}
            rules={[
              { required: true, message: "选择文章标签" },
              { type: "array", min: 1, max: 6, message: "标签数量为1-6" },
            ]}
          >
            <Type />
          </Item>
          <Item
            label="封面"
            name="cover_file_name"
            rules={[{ min: 15, max: 50, message: "封面文件错误" }]}
          >
            <Cover />
          </Item>
          <Item
            label="文章摘要"
            name="description"
            rules={[{ max: 200, message: "文章摘要最多200字" }]}
          >
            <TextArea
              value={articleData.description || ""}
              onChange={(e) => updateData({ description: e.target.value })}
              rows={4}
              placeholder="文章简介，最多200字"
              maxLength={200}
              showCount
              className="!w-11/12"
            />
          </Item>
          <Item
            label="转载地址"
            name="reprint"
            rules={[
              {
                pattern: /^https:\/\/.*/,
                message: "转载地址为https协议",
              },
              { min: 1, max: 150, message: "地址长度为1-150" },
            ]}
          >
            <Reprint />
          </Item>
          <Item>
            <div className="border-t-solid flex justify-end border-slate-200 py-4">
              <Button type="primary" htmlType="submit" className="mr-3">
                确认并发布
              </Button>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
};
export default Modal;
