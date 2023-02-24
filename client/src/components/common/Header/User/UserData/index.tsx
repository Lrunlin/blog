import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Avatar from "../../../Avatar";
import News from "../../News";

const UserData = () => {
  let router = useRouter();
  function onSelect({ key }: { key: string }) {
    router.push(key);
  }
  return (
    <>
      <div className="flex items-center">
        <Dropdown
          menu={{
            onClick: onSelect,
            className: "w-full",
            items: [
              {
                label: "发布文章",
                key: "/article/editor",
              },
              {
                label: "提问题",
                key: "/problem/editor",
              },
              {
                label: "创作者中心",
                key: "/creator",
              },
            ],
          }}
          placement="bottomLeft"
        >
          <div>
            <Button type="primary">创作者</Button>
            <Button type="primary" icon={<DownOutlined />} />
          </div>
        </Dropdown>
        <News className="mx-8" />
        <Avatar />
      </div>
    </>
  );
};
export default UserData;
