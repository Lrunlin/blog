import { Fragment } from "react";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

/** 问答页面底部评论组件的提示上方提示文字*/
const Message = () => {
  const list = [
    {
      title: "适合作为回答的",
      colorClassName: "text-green-700",
      icon: <CheckCircleOutlined />,
      message: [
        "经过验证的有效解决办法",
        "自己的经验指引，对解决问题有帮助",
        "遵循 Markdown 语法排版，代码语义正确",
      ],
    },
    {
      title: "不该作为回答的",
      colorClassName: "text-red-700",
      icon: <CloseCircleOutlined />,
      message: [
        "询问内容细节或回复楼层",
        "与题目无关的内容",
        "“赞”“顶”“同问”“看手册”“解决了没”等毫无意义的内容",
      ],
    },
  ];
  return (
    <>
      {list.map((item, index) => (
        <Fragment key={`${item.title}-${index}`}>
          <div className={`${item.colorClassName} text-lg`}>{item.title}</div>
          <ul className={`list-none p-0 mb-2`}>
            {item.message.map((mes, _index) => (
              <li key={`${mes}-${_index}`} className="text-base flex items-center">
                <span className={`${item.colorClassName}`}>{item.icon}</span>
                <span className="ml-2">{mes}</span>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </>
  );
};
export default Message;
