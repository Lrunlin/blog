import { Popover, QRCode } from "antd";
import {
  QqOutlined,
  WechatOutlined,
  WeiboSquareOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import Image from "@/components/next/Image";
import userUserCurrentArticleData from "@/store/user/user-current-article-data";
import itemClassName from "./class";

const Share = () => {
  let currentArticleData = userUserCurrentArticleData((s) => s.data);

  function link(url: string) {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    a.click();
  }
  function shareWeiBo() {
    link(`
https://service.weibo.com/share/share.php?title=${currentArticleData.title}-${process.env.NEXT_PUBLIC_SITE_NAME} #${process.env.NEXT_PUBLIC_SITE_NAME}文章#
&pic=${process.env.NEXT_PUBLIC_HOST}/favicon.svg
`);
  }
  function shareQQ() {
    link(`
https://connect.qq.com/widget/shareqq/index.html?url=${window.location.href}
&title=${currentArticleData.title}-${process.env.NEXT_PUBLIC_SITE_NAME}
&summary=${
      currentArticleData.description
        ? currentArticleData.description.substring(0, 20)
        : `${process.env.NEXT_PUBLIC_SITE_NAME}社区的文章分享`
    }
&pics=${process.env.NEXT_PUBLIC_HOST}/favicon.svg
`);
  }

  return (
    <>
      <Popover
        placement="right"
        content={
          <div className="w-24 font-bold text-gray-500">
            <Popover
              placement="right"
              content={
                typeof window != "undefined" && (
                  <QRCode size={100} value={window.location.href} />
                )
              }
            >
              <div className="cursor-pointer py-1 hover:bg-gray-50 hover:text-gray-600">
                <WechatOutlined className="ml-2" size={20} />
                <span className="ml-2">微信</span>
              </div>
            </Popover>
            <div
              onClick={shareWeiBo}
              className="cursor-pointer py-1 hover:bg-gray-50 hover:text-gray-600"
            >
              <WeiboSquareOutlined className="ml-2" size={20} />
              <span className="ml-2">新浪微博</span>
            </div>
            <div
              onClick={shareQQ}
              className="cursor-pointer py-1 hover:bg-gray-50 hover:text-gray-600"
            >
              <QqOutlined className="ml-2" size={20} />
              <span className="ml-2">QQ</span>
            </div>
          </div>
        }
      >
        <div className={classNames([itemClassName, "hover:text-blue-500"])}>
          <Image
            src="/icon/client/share.png"
            width={24}
            height={24}
            alt="share"
          />
        </div>
      </Popover>
    </>
  );
};
export default Share;
