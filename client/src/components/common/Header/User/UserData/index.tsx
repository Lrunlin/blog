import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Avatar from "../../../Avatar";
import News from "../../News";

const UserData = () => {
  let router = useRouter();
  function onSelect({ key }: { key: string }) {
    router.push(key);
  }
  const menu = (
    <Menu
      onClick={onSelect}
      className="w-full"
      items={[
        {
          label: "发布文章",
          key: "/write",
        },
        {
          label: "创作者中心",
          key: "/creator",
        },
      ]}
    />
  );
  return (
    <>
      <div className="flex items-center">
        <Dropdown.Button
          getPopupContainer={() =>
            document.getElementsByClassName("header-dropdown-button-positon")[0] as HTMLElement
          }
          icon={<DownOutlined />}
          className="header-dropdown-button-positon"
          type="primary"
          overlay={menu}
          overlayStyle={{ width: "110%" }}
          onClick={() => router.push("/creator")}
        >
          创作者
        </Dropdown.Button>
        <News className="mx-8" />
        <Avatar />
      </div>
    </>
  );
};
export default UserData;
