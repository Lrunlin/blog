import { useState, Fragment } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import style from "./index.module.scss";
interface props {
  switchMessageState: Function;
}
function Message(props: props) {
  const { TextArea } = Input;
  const [contact, setContact] = useState<string>(""); //联系方式
  const [content, setContent] = useState<string>(""); //留言内容
  const [isLoad, setIsLoad] = useState<boolean>(false); //按钮是否加载状态
  //判断字符串长度是否小于规定长度
  const checkLength = (str: string, length: number): boolean => {
    return str.length <= length;
  };
  //是否经过关键字检测
  const isSecurity: boolean = !["<", ">", "select", "delete", "update", "insert"].find(
    (item: string) => !!(contact + "/" + content).includes(item)
  );

  const submit: Function = (state): void => {
    setIsLoad(true);
    let textLength = checkLength(contact, 30) && checkLength(content, 200);
    if (textLength) {
      if (isSecurity) {
        axios.post("/message", { contact, content }).then(res => {
          if (res.data.success) {
            message.success(`留言成功`);
            setIsLoad(false);
            props.switchMessageState(false);
          } else {
            message.error(`留言失败`);
            setIsLoad(false);
          }
        });
      } else {
        message.error(`前端禁止输入<,>,selec, delete,update, insert等关键词`);
        setIsLoad(false);
      }
    } else {
      message.error("请不要超出文字限制");
      setIsLoad(false);
    }
  };
  return (
    <>
      <div className={style.message_container} onClick={(e: any) => props.switchMessageState()}>
        <div className={style.message} onClick={(e: any) => e.stopPropagation()}>
          <h2>留言</h2>
          <Input
            placeholder="联系方式（选填）"
            maxLength={30}
            onInput={(e: any) => setContact(e.target.value)}
          />
          <TextArea
            rows={6}
            placeholder="留言内容（网站已经限制了SQL注入,和XXS攻击请文明评论）,您的留言只会显示给管理员,不会用于网站展示"
            className={style.message_input}
            maxLength={200}
            onInput={(e: any) => setContent(e.target.value)}
          />
          <Button type="primary" loading={isLoad} onClick={() => (!isLoad ? submit(true) : null)}>
            提交留言
          </Button>
        </div>
      </div>
    </>
  );
}
export default Message;
