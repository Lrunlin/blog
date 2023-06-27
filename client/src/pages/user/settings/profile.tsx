import type { NextPage } from "next";
import Layout from "@/components/page/user/setting/Layout";
import useUserData from "@/store/user-data";
import { Button, Result, Form, Input, message } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import useSwr from "swr";
import axios from "axios";
import UploadAvatar from "@/components/page/user/setting/UploadAvatar";

let { useForm } = Form;
const Profile: NextPage = () => {
  let [form] = useForm();
  let [userData] = useUserData();

  let { data, error, mutate } = useSwr(`user-set-${userData?.id}`, () =>
    userData ? axios.get(`/user/data/${userData?.id}`).then(res => res.data.data) : undefined
  );

  const onFinish = (values: any) => {
    axios
      .put("/user", values)
      .then(res => {
        message.success(res.data.message);
        mutate();
      })
      .catch(err => {
        message.error(err.message || "修改失败");
      });
  };

  // 切换地区、重新定位
  const location = Form.useWatch("location", form);
  function getLocation() {
    axios
      .get("/location")
      .then(res => {
        form.setFieldsValue({ location: res.data.data });
      })
      .catch(() => {
        message.error("请求失败");
      });
  }

  return (
    <Layout>
      <h2 className="pb-2 border-b-solid border-gray-200">个人资料</h2>
      {error && <Result status="404" title="没有找到指定的用户" />}
      {data && (
        <div className="flex mt-6">
          <div className="w-3/5 ml-8">
            <style jsx global>
              {`
                .ant-form-item {
                  margin-bottom: 10px;
                }
              `}
            </style>
            <Form
              form={form}
              labelCol={{ span: 4 }}
              initialValues={data}
              onFinish={onFinish}
              autoComplete="off"
              onFinishFailed={({ errorFields }) => {
                if (errorFields.length) {
                  message.warning(errorFields[0].errors[0]);
                }
              }}
            >
              <Form.Item
                label="用户昵称"
                name="name"
                rules={[
                  { required: true, message: "请输入昵称" },
                  { min: 1, max: 12, message: "昵称长度在1-12之间" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="单位/机构"
                name="unit"
                rules={[{ max: 20, message: "最大长度为20" }]}
              >
                <Input maxLength={20} />
              </Form.Item>
              <Form.Item
                name="location"
                label="地区"
                rules={[{ max: 15, message: "地区的最大长度为15" }]}
              >
                <>
                  <EnvironmentOutlined onClick={getLocation} title="重新定位" className="text-lg" />
                  <span className="ml-2">{location}</span>
                </>
              </Form.Item>
              <Form.Item
                name="site"
                label="个人主页"
                rules={[{ max: 100, message: "网站最大长度为100" }]}
              >
                <Input maxLength={100} showCount />
              </Form.Item>
              <Form.Item
                name="description"
                label="介绍"
                rules={[{ max: 200, message: "自我介绍最大长度为200" }]}
              >
                <Input.TextArea maxLength={200} showCount rows={6} />
              </Form.Item>

              <Form.Item
                name="avatar_file_name"
                hidden
                rules={[{ required: true, min: 1, max: 50, message: "请上传头像" }]}
                children={<div></div>}
              />

              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button type="primary" htmlType="submit">
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="ml-28">
            <UploadAvatar
              avatar_file_name={data.avatar_file_name}
              avatar_url={data.avatar_url}
              onChange={val => {
                form.setFieldsValue({ avatar_file_name: val });
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Profile;
