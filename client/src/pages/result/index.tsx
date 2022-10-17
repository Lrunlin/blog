import { useEffect, useMemo } from "react";
import Base from "@/layout/Base";
import { Button, Result } from "antd";
import { useRouter } from "next/router";
import qs from "qs";
import cookie from "js-cookie";

/** 为一些页面显示处理结果*/
const ResultFC = () => {
  let router = useRouter();
  let query = useMemo(() => qs.parse(qs.stringify(router.query)), [router.query]);
  useEffect(() => {
    if (query.token) cookie.set("token", query.token + "", { expires: 365 });
  }, [query]);
  function SubTitle() {
    let message = query.message as string | string[];
    if (!message) {
      return <></>;
    }
    if (Array.isArray(message)) {
      return (
        <ul className="list-none">
          {message.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return <div>{message}</div>;
  }
  return (
    <Base>
      <div className="w-full bg-white">
        <div className="w-full">
          <Result
            status={router.query.success == "true" ? "success" : "error"}
            title={router.query.title}
            subTitle={<SubTitle />}
            extra={
              router.query.href && (
                <Button type="primary" onClick={() => router.replace(router.query.href + "")}>
                  返回
                </Button>
              )
            }
          />
        </div>
      </div>
    </Base>
  );
};
export default ResultFC;
