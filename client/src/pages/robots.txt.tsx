import { GetServerSideProps } from "next";

const Robots = () => null;
export default Robots;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader("Content-Type", "text/txt; charset=utf-8");
  if (req.headers["x-from-cdn"]) {
    res.write(`User-agent: *\nDisallow:/`);
  } else {
    await import("fs")
      .then(fs => {
        let robotsTxt = fs.readFileSync("public/robots-template.txt").toString();
        res.write(robotsTxt);
      })
      .catch(err => {
        console.log(`获取robots.txt时错误:${err}`);
        res.statusCode = 500;
      });
  }

  res.end();
  return {
    props: {},
  };
};
