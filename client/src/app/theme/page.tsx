"use client";
import Base from "@/layout/Base";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import useUserData from "@/store/user/user-data";
import CreateTheme from "@/components/common/CreateTheme";
import Head from "@/components/next/Head";

const Theme = () => {
  let userData = useUserData(s => s.data);

  return (
    <Base>
      <Head title="提交主题" />
      <div className="w-full">
        {userData ? (
          <CreateTheme />
        ) : (
          <Result icon={<SmileOutlined />} title="请登录后在提交主题" />
        )}
      </div>
    </Base>
  );
};
export default Theme;
