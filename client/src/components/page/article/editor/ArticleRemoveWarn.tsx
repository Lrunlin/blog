import { useState } from "react";
import { Button, Modal } from "antd";
import useUserData from "@/store/user-data";
import dayjs from "dayjs";

/** 通知三天内注册的新用户删除文章*/
const ArticleRemoveWarn = () => {
  let [useData] = useUserData();
  let day = dayjs(new Date()).diff(useData?.create_time || new Date(), "day");
  const [isModalOpen, setIsModalOpen] = useState(
    !!useData && day <= 3 && !localStorage.article_remove_warn
  );
  
  return (
    <>
      <Modal
        footer={() => (
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
              window.localStorage.setItem("article_remove_warn", "true");
            }}
          >
            确定
          </Button>
        )}
        maskClosable={true}
        title="通知"
        open={isModalOpen}
      >
        <div className="font-bold">
          <div>测试用户请在发布文章后对文章进行删除</div>
        </div>
      </Modal>
    </>
  );
};
export default ArticleRemoveWarn;
