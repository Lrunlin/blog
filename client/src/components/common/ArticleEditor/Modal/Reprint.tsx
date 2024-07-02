import { useEffect, useState } from "react";
import { Input, Radio } from "antd";
import useUserWriteArticle from "@/store/user/user-write-article";

const Reprint = () => {
  let articleData = useUserWriteArticle((s) => s.data);
  let updateData = useUserWriteArticle((s) => s.updateData);

  let [isReprint, setIsReprint] = useState(false);

  useEffect(() => {
    setIsReprint(!!articleData.reprint);
  }, [articleData.reprint]);

  return (
    <>
      <div>
        <Radio.Group
          onChange={(e) => {
            setIsReprint(e.target.value);
            // 如果是原创
            if (!e.target.value) {
              updateData({ reprint: null });
            }
          }}
          value={isReprint}
        >
          <Radio value={false}>原创</Radio>
          <Radio value={true}>转载</Radio>
        </Radio.Group>
      </div>
      {isReprint && (
        <Input
          value={articleData.reprint || ""}
          onChange={(e) => updateData({ reprint: e.target.value })}
          placeholder="转载地址为https协议网站（原创文章请忽略）"
          className="mt-2 !w-11/12"
          maxLength={150}
        ></Input>
      )}
    </>
  );
};
export default Reprint;
