import { useState, useEffect } from "react";
import { Radio, Input } from "antd";
import { useRecoilState } from "recoil";
import { writeArticleContext } from "../index";

const Reprint = () => {
  let [articleData, setArticleData] = useRecoilState(writeArticleContext);
  let [isReprint, setIsReprint] = useState(false);

  useEffect(() => {
    setIsReprint(!!articleData.reprint);
  }, [articleData.reprint]);

  return (
    <>
      <div>
        <Radio.Group
          onChange={e => {
            setIsReprint(e.target.value);
            // 如果是原创
            if (!e.target.value) {
              setArticleData(_data => ({ ..._data, reprint: null }));
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
          onChange={e => setArticleData(_data => ({ ..._data, reprint: e.target.value }))}
          placeholder="转载地址为https协议网站（原创文章请忽略）"
          className="!w-11/12 mt-2"
          maxLength={150}
        ></Input>
      )}
    </>
  );
};
export default Reprint;
