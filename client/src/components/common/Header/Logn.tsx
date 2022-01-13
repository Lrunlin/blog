import { FunctionComponent } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Modal, Tabs } from "antd";

const { TabPane } = Tabs;

interface propsTypes {
  isLayerShow: boolean;
  closeLayer: (state: false) => void;
}

const Logn: FunctionComponent<propsTypes> = ({ isLayerShow, closeLayer }) => {
  return (
    <div>
      <Modal
        visible={isLayerShow}
        destroyOnClose={true}
        footer={null}
        onCancel={() => closeLayer(false)}
        width={420}
      >
        {/* 登录 */}
        <Tabs defaultActiveKey="1">
          <TabPane tab="密码登录" key="1">
            <SignIn />
          </TabPane>
          {/* 注册 */}
          <TabPane tab="新用户注册" key="2">
            <SignUp />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
export type { propsTypes };
export default Logn;
