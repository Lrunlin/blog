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
        <Dropdown.Button
          arrow={true}
          icon={<DownOutlined />}
          type="primary"
          placement="bottomLeft"
          className="flex items-center"
          onClick={() => router.push("/creator")}
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
          创作者中心
        </Dropdown.Button>
        <News className="mx-8" />
        <Avatar size={30} />
      </div>
    </>
  );
};
export default UserData;
