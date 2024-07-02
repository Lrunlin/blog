import { useRouter } from "next/navigation";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Image from "@/components/next/Image";
import Avatar from "../../../Avatar";
import News from "../../News";

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
            <div className="flex rounded-sm bg-white p-2 shadow-md">
              <div
                className="cursor-pointer p-3"
                onClick={() => router.push("/article/editor")}
              >
                <Image
                  width={44}
                  height={44}
                  src="/icon/client/write-article.svg"
                  alt="ICON"
                />
                <div className="text-gray-700">写文章</div>
              </div>
              <div
                className="cursor-pointer p-3"
                onClick={() =>
                  router.push("/creator/content/article?key=draft")
                }
              >
                <Image
                  width={44}
                  height={44}
                  src="/icon/client/drafts.svg"
                  alt="ICON"
                />
                <div className="text-gray-700">草稿箱</div>
              </div>
              <div
                className="cursor-pointer p-3"
                onClick={() => router.push("/problem/editor")}
              >
                <Image
                  width={44}
                  height={44}
                  src="/icon/client/problem.svg"
                  alt="ICON"
                />
                <div className="text-gray-700">提问题</div>
              </div>
            </div>
          )}
        >
          创作者中心
        </Dropdown.Button>
        <News className="mx-8" />
        <Avatar />
      </div>
    </>
  );
};
export default UserData;
