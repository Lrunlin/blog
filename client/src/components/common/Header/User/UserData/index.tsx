import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Avatar from "../../../Avatar";
import News from "../../News";
import Image from "@/components/next/Image";

const UserData = () => {
  let router = useRouter();
  return (
    <>
      <div className="flex items-center">
        <Dropdown
          arrow={true}
          placement="bottomRight"
          className="flex items-center"
          dropdownRender={() => (
            <div className="shadow-md rounded-sm p-2 flex bg-white">
              <div className="p-3 cursor-pointer" onClick={() => router.push("/article/editor")}>
                <Image width={44} height={44} src="/icon/client/write-article.svg" alt="ICON" />
                <div className="text-gray-700">写文章</div>
              </div>
              <div
                className="p-3 cursor-pointer"
                onClick={() => router.push("/creator/content/article?key=draft")}
              >
                <Image width={44} height={44} src="/icon/client/drafts.svg" alt="ICON" />
                <div className="text-gray-700">草稿箱</div>
              </div>
              <div className="p-3 cursor-pointer" onClick={() => router.push("/problem/editor")}>
                <Image width={44} height={44} src="/icon/client/problem.svg" alt="ICON" />
                <div className="text-gray-700">提问题</div>
              </div>
            </div>
          )}
        >
          <div>
            <Button type="primary" onClick={() => router.push("/creator")}>
              创作者中心
            </Button>
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
