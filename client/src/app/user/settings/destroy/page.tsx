"use client";

import { Alert, Button, Tooltip, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "@axios";
import cookie from "js-cookie";
import useUserData from "@/store/user/user-data";

const Destroy = () => {
  let userDataStore = useUserData((s) => s);

  function remove() {
    axios
      .post("/user/destroy")
      .then((res) => {
        cookie.remove("token", {
          expires: 365,
          domain: `.${window.location.hostname.split(".").slice(-2).join(".")}`,
        });
        message.success(res.data.message);
        userDataStore.setData(null);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }
  return (
    <>
      <div>
        <Alert
          message="账号注销"
          description={
            <ol>
              <li>注销账号为数据库内逻辑删除</li>
              <li>你的密码会被随机数重置、邮箱会被随机邮箱覆盖</li>
              <li>你的用户名会被修改为用户-XXXX(你的ID)、头像会被重置</li>
              <li>你的联系方式、地址等信息会被删除(如果有)</li>
              <li>你的文章、评论、收藏等信息不会被删除</li>
              <li>注销后无法找回!!!</li>
            </ol>
          }
          type="error"
          showIcon
        />
        <div className="mt-6 flex justify-center">
          <Tooltip
            title={
              userDataStore?.data?.auth != 0
                ? "管理员账号禁止注销"
                : "点击就会删除，没有确认"
            }
          >
            <Button
              disabled={userDataStore?.data?.auth != 0}
              onClick={remove}
              icon={<DeleteOutlined />}
              className="w-40"
              type="primary"
              danger
            >
              删除
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
export default Destroy;
