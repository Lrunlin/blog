import fs from "fs";

// 处理生产环境生成的antdcss文件无法访问的问题
import { GetServerSideProps } from "next";
const Antd = () => null;
export default Antd;
export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  let name = params!.name as string | undefined;
  if (typeof name == "string" && name?.endsWith(".css")) {
    try {
      let content = fs.readFileSync(`.next/static/css/${name}`).toString();
      res.setHeader("Content-Type", "text/css");
      res.statusCode = 200;
      res.write(content);
      res.end();
    } catch (error) {
      res.statusCode = 404;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
  return {
    props: {},
  };
};
