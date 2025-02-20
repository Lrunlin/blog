import { GithubOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="mt-14 h-20 !text-black">
      <div className="h-full">
        <div className="flex items-center justify-center">
          <a
            href="http://www.apache.org/licenses/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="ml-4 text-inherit"
          >
            Apache License 2.0
          </a>
          <span className="ml-6">
            请在使用时保留开源项目地址以及全部版权相关信息
          </span>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <span> Powered by</span>
            <a
              href="https://github.com/Lrunlin/blog"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="ml-4 text-inherit"
            >
              <GithubOutlined />
            </a>
          </div>
          <div className="mx-2 h-4 w-px border bg-gray-400"></div>
          <div>
            <a
              href="https://github.com/Lrunlin"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-inherit"
            >
              Lrunlin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
