import { useState, useContext, FunctionComponent } from "react";
import type { NextPage } from "next";
import { Upload, Card, message, Form, Input, Button } from "antd";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import css from "styled-jsx/css";

import UserFace from "@/components/common/UserFace";
import Layout from "@/layout/Base";
import { Context } from "@/store";
import { response } from "@/types";
interface formValueTypes {
  GitHub: string;
  email: string;
  password: string;
}

const Style = css.resolve`
  .container {
    display: flex;
    justify-content: space-between;
  }
`;

const Aside = () => {
  return (
    <>
      <aside>
        <Card title="设置" style={{ width: 200, height: "100vh" }}>
          <div>账号设置</div>
        </Card>
      </aside>
    </>
  );
};

const Main: FunctionComponent = () => {
  let router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const onFinish = (e: formValueTypes) => {
    axios
      .put<response>("/user", { GitHub: e.GitHub, password: e.password, userFace: !!imageUrl })
      .then(res => {
        if (res.data.success) {
          message.success("修改成功");
          router.reload();
        } else {
          message.error("修改失败");
        }
      });
  };

  const [isLoad, setIsLoad] = useState(false);

  const beforeUpload = (file: any) => {
    let whiteList = ["image/jpeg", "image/png"];
    if (!whiteList.includes(file.type)) {
      message.error("上传格式只支持png、jpg");
      return false;
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error("图片不得大于3MB");
    }
    return true;
  };
  const loadAssets = (info: any) => {
    if (info.file.status === "uploading") {
      setIsLoad(true);
    }
    if (info.file.status === "done") {
      setIsLoad(false);
      if (info.file.response.success) {
        setImageUrl(`${store.assetsPath}/face/${info.file.response.data}?v${+new Date()}`); //刷新缓存
      } else {
        message.error("上传失败");
      }
    }
    if (info.file.status === "error") {
      setIsLoad(false);
      setImageUrl("");
    }
  };

  const store = useContext(Context);
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <style jsx>{`
        .form {
          background: white;
          flex-grow: 1;
          margin: 0px 10px;
          padding: 0px 10px;
        }
      `}</style>
      <div className="form">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ GitHub: store.userData.GitHub, email: store.userData.email }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="头像" name="face" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload
              name="image"
              listType="picture-card"
              beforeUpload={beforeUpload}
              onChange={loadAssets}
              maxCount={1}
              onRemove={() => setImageUrl("")}
              action={`${store.assetsPath}/user/face`}
              headers={{ authorization: localStorage.token, "user-face": "true" }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="用户头像" style={{ width: "100%" }} />
              ) : (
                <div title="图片大小上限为3MB">
                  {isLoad ? (
                    <LoadingOutlined />
                  ) : (
                    <UserFace width={120} height={120} userId={store.userData.email} />
                  )}
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item label="邮箱" name="email">
            <Input
              placeholder="你在控制台改了DOM，后台也不会修改email的"
              disabled={true}
              style={{ width: "400px" }}
            />
          </Form.Item>

          <Form.Item
            label="GitHub"
            name="GitHub"
            rules={[
              {
                required: false,
                min: 20,
                max: 40,
                message: "请填写正确的GitHub主页地址,例如:https://github.com/Lrunlin",
              },
            ]}
          >
            <Input
              style={{ width: "400px" }}
              placeholder="GitHub主页地址(例:https://github.com/Lrunlin)"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: false,
                type: "string",
                min: 6,
                max: 16,
                message: "密码应由6-16位数字或字母组成",
                pattern: /^[A-Za-z0-9]+$/,
              },
            ]}
          >
            <Input.Password
              style={{ width: "400px" }}
              placeholder="密码为6-16位数字或字母（空代表不修改）"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
const Error: FunctionComponent = () => {
  return (
    <div style={{ flexGrow: 1, margin: "0px 10px", backgroundColor: "white" }}>
      <strong>请先登录</strong>
    </div>
  );
};
const Set: NextPage = () => {
  const store = useContext(Context);
  return (
    <Layout styleJsx={Style}>
      <Aside />
      {store.userData.sign ? <Main /> : <Error />}
    </Layout>
  );
};
export default Set;
