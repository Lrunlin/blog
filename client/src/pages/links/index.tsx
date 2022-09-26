import { useState, useTransition } from "react";
import axios from "axios";
import { Modal, Form, Input, message, Collapse, Badge } from "antd";
import type { GetServerSideProps, NextPage } from "next";
import Header from "@/components/common/Header";
import Head from "@/components/next/Head";
import useUserData from "@/store/user-data";
import UpLoad from "@/components/page/links/UpLoad";
import type { LinksAttributes } from "@type/model-attribute";
import type { userDataType } from "@type/user-data";
import type { response } from "@type/response";
import Link from "next/link";
type linksItem = Pick<LinksAttributes, "id" | "name" | "logo_file_name" | "logo_url" | "url"> & {
  user_data: userDataType;
};

const siteData = [
  { label: "网站名称", value: process.env.NEXT_PUBLIC_SITE_NAME },
  { label: "网址", value: process.env.NEXT_PUBLIC_HOST },
  { label: "Logo", value: `${process.env.NEXT_PUBLIC_HOST}/favicon.svg` },
  { label: "网站介绍", value: `${process.env.NEXT_PUBLIC_SITE_NAME}:一个多人博客社区` },
];

const Links: NextPage<{ data: linksItem[] }> = props => {
  let { useForm } = Form;
  let [form] = useForm();
  let [userData] = useUserData();

  let [, startTransition] = useTransition();

  const [isModalVisible, setIsModalVisible] = useState(false);

  function onFinish(values: any) {
    axios.post("/links", values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        startTransition(() => {
          setIsModalVisible(false);
        });
        form.resetFields();
      } else {
        message.error(res.data.message);
      }
    });
  }

  return (
    <>
      <Head title="友情链接" description="友情链接" keywords={["友情链接"]} />
      <Header />
      <Modal
        title="友链申请"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        okText="发出申请"
        cancelText="取消"
      >
        <Collapse className="select-none">
          <Collapse.Panel header="点击查看本站信息" key="1">
            {siteData.map(item => (
              <div className="mt-2 flex select-text" key={item.value + item.label}>
                <div className="w-20 text-right">{item.label}:</div>
                <div className="ml-2">{item.value}</div>
              </div>
            ))}
          </Collapse.Panel>
        </Collapse>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          validateTrigger="onSubmit"
          className="mt-6"
        >
          <Form.Item
            label="网站名称"
            name="name"
            rules={[
              { required: true, message: "请填写网站名称" },
              { type: "string", min: 2, max: 30, message: "网站名称为长度2-30位" },
            ]}
          >
            <Input maxLength={30} placeholder="网站名称为长度2-30位" />
          </Form.Item>

          <Form.Item
            label="网址"
            name="url"
            rules={[
              { required: true, message: "请填写友链网址" },
              {
                type: "string",
                min: 8,
                max: 100,
                message: "网址为8-100位字符串",
              },
              {
                type: "url",
                message: "网址格式不正确",
              },
              {
                pattern: /^https:\/\/.*/,
                message: "网站协议为https",
              },
            ]}
          >
            <Input placeholder="网址为https网址长度为8-100" />
          </Form.Item>

          <Form.Item
            label="LOGO"
            name="logo_file_name"
            rules={[{ required: true, min: 10, message: "请上传网站Logo" }]}
          >
            <UpLoad />
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <h2 className="text-center mt-10">友情链接</h2>
        <div className="w-[992px] p-4 mt-12 mx-auto flex flex-wrap">
          {userData && (
            <div
              className="w-44 h-16 mr-4 mt-4 bg-gray-100 flex items-center justify-center cursor-pointer border border-solid border-gray-200"
              onClick={() => setIsModalVisible(true)}
            >
              + 申请友链
            </div>
          )}
          {props.data.map(item => (
            <Badge.Ribbon
              text={
                <Link href={`/user/${item.user_data.id}`}>
                  <a className="text-white">{item.user_data.name}</a>
                </Link>
              }
              className="cursor-pointer"
              key={item.id}
            >
              <a
                target="_blank"
                href={item.url}
                className="w-44 h-16 mr-4 mt-4 relative group flex items-center justify-center cursor-pointer border border-solid border-gray-200"
              >
                <span className="hidden group-hover:inline">{item.name}</span>
                <img
                  src={item.logo_url}
                  alt="友情链接Logo"
                  className="h-7 max-w-[70%] group-hover:hidden"
                />
              </a>
            </Badge.Ribbon>
          ))}
        </div>
      </div>
    </>
  );
};
export default Links;

export const getServerSideProps: GetServerSideProps = async ctx => {
  return await axios
    .get<response<linksItem[]>>("/links")
    .then(res => {
      return { props: { data: res.data.data } };
    })
    .catch(err => {
      ctx.res.statusCode = 500;
      return { props: { data: [] } };
    });
};
