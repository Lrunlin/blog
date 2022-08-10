import Image from "next/image";
import { Dropdown } from "antd";
import classNames from "classnames";
import style from "./index.module.scss";

let list = [
  [
    <a target="_blank" href="/links" rel="noopener noreferrer nofollow">
      友情链接
    </a>,
    <a target="_blank" href="/sitemap.xml" rel="noopener noreferrer nofollow">
      SiteMap
    </a>,
    <a target="_blank" href="/about">
      关于我们
    </a>,
  ],
  [
    <a
      href="https://beian.miit.gov.cn/#/Integrated/index"
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="flex items-center"
    >
      <Image src="/icon/police.png" width={20} height={20} />
      辽ICP备2020014377号
    </a>,
  ],
  [<a>&copy;2022-网络日志</a>],
];

const Footer = () => {
  return (
    <footer>
      {list.map((item, index) => (
        <ul className="p-0 m-0 text-sm list-none flex items-center" key={`footer-link-${index}`}>
          {item.map((_item, _index) => (
            <li
              className={classNames([style["child-a-gray"], _index && "ml-2", "mt-1"])}
              key={`footer-link-${index}-${_index}`}
            >
              {_item}
            </li>
          ))}
        </ul>
      ))}
      <div className="flex">
        <div className="mt-3">
          <Dropdown
            placement="bottom"
            overlay={
              <div className="bg-white w-40 h-52 pt-2 rounded text-center">
                <div>QQ:1974109227</div>
                <div>
                  <Image src="/qq-qrcode.jpg?!@3" width={140} height={140} />
                </div>
              </div>
            }
          >
            <a
              href="http://wpa.qq.com/msgrd?v=3&uin=1974109227&site=qq&menu=yes"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Image src="/icon/qq.png?qq" width={24} height={24} />
            </a>
          </Dropdown>
        </div>
        <div className="mt-3 ml-2">
          <Dropdown
            placement="bottom"
            overlay={
              <div className="bg-white w-40 h-52 pt-2 rounded text-center">
                <div>添加站长微信</div>
                <div>
                  <Image src="/wechat-qrcode.jpg?!@3" width={140} height={140} />
                </div>
              </div>
            }
          >
            <Image src="/icon/wechat.png?qq" width={24} height={24} />
          </Dropdown>
        </div>
        <div className="mt-3 ml-2">
          <a href="mailto:353575900@qq.com" target="_blank" rel="noopener noreferrer nofollow">
            <Image src="/icon/email.png" width={24} height={24} />
          </a>
        </div>
        <div className="mt-3 ml-2">
          <a href="https://github.com/Lrunlin" target="_blank" rel="noopener noreferrer nofollow">
            <Image src="/icon/github.png" width={24} height={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
