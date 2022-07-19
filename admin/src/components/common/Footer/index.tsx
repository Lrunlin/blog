import { GithubOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="h-20 mt-20 bg-gray-100">
      <div className="h-full w-[200px] mx-auto flex items-center justify-around">
        <div>
          Powered by
          <a
            href="https://github.com/Lrunlin/blog"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="ml-4"
          >
            <GithubOutlined />
          </a>
        </div>
        <div className="w-px border bg-gray-400 h-4"></div>
        <div>
          <a href="https://github.com/Lrunlin" target="_blank" rel="nofollow noopener noreferrer">
            Lrunlin
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
