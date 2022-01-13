import { FunctionComponent } from "react";
import BarHeader from "@/components/home/BarHeader";
import Image from "next/image";

const Contact: FunctionComponent = () => {
  return (
    <>
      <BarHeader
        id="contact"
        titleEn="CONTACT"
        title="联系·我"
        text={["席不正 不坐", "简单做人，用心做事"]}
      />
      <div style={{ textAlign: "center", padding: "30px 0px" }}>
        <Image src="/image/wechat-qrcode.jpg" width={170} height={170} alt="微信:webzhizuo" />
      </div>
    </>
  );
};
export default Contact;
