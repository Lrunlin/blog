import Base from "@/layout/Base";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { CreateTheme } from "@/pages/admin/theme/create";
import useUserData from "@/store/user-data";

const Theme = () => {
  let [userData] = useUserData();

  return (
    <Base>
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
