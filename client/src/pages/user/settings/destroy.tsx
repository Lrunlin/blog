import { Alert, Button, Tooltip, message } from "antd";
import Layout from "@/components/page/user/setting/Layout";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import cookie from "js-cookie";
const Destroy = () => {
  function remove() {
    axios
      .post("/user/destroy")
      .then(res => {
        cookie.remove("token", {
          expires: 365,
          domain: `.${window.location.hostname.split(".").slice(-2).join(".")}`,
        });
        message.success(res.data.message);
      })
      .catch(err => {
        message.error(err.message);
      });
  }
  return (
    <Layout>
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
          <Tooltip title="点击就会删除，没有确认">
            <Button
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
    </Layout>
  );
};
export default Destroy;
