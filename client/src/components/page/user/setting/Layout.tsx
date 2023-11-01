import type { ReactNode, FC } from "react";
import { useRouter } from "next/navigation";
import { Button, Result } from "antd";
import { useSetRecoilState } from "recoil";
import { modalStateContext } from "@/components/common/Header/Sign";
import Base from "@/layout/Base";
import { LeftOutlined, IdcardOutlined, SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import ActiveLink from "@/components/next/ActiveLink";
import useUserData from "@/store/user-data";

const list = [
  {
    href: "/user/settings/profile",
    icon: <IdcardOutlined />,
    label: "个人信息",
  },
  {
    href: "/user/settings/account",
    icon: <SettingOutlined />,
    label: "账号设置",
  },
  {
    href: "/user/settings/destroy",
    icon: <DeleteOutlined />,
    label: "账号注销",
  },
];

interface propsType {
  children: ReactNode;
}

const Layout: FC<propsType> = ({ children }) => {
  let [userData] = useUserData();
  let router = useRouter();
  let setModalState = useSetRecoilState(modalStateContext);

  return (
    <Base className="container">
      <div className="w-full m-0">
        <div className="w-full py-3 bg-white shadow-sm">
          <span
            className="ml-4 cursor-pointer"
            onClick={() => router.push(`/user/${userData?.id}`)}
          >
            <LeftOutlined />
            返回个人主页
          </span>
        </div>
        <div className="mt-2 flex h-[630px]">
          <aside className="w-56 bg-white mr-6 shadow-sm">
            <div className="w-56 p-2">
              {list.map(item => {
                return (
                  <ActiveLink
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className="h-10 pl-2 text-black rounded-sm flex items-center hover:bg-blue-100 hover:text-blue-600"
                    activeClassName="bg-blue-100 text-blue-600"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </ActiveLink>
                );
              })}
            </div>
          </aside>
          <main className="w-full p-2 bg-white shadow-sm">
            <>
              {userData ? (
                <>{children}</>
              ) : (
                <Result
                  status="404"
                  title="没有找到您的信息，请登录"
                  extra={
                    <Button type="primary" onClick={() => setModalState("LogIn")}>
                      登录
                    </Button>
                  }
                />
              )}
            </>
          </main>
        </div>
      </div>
    </Base>
  );
};
export default Layout;
