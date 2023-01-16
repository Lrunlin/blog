import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import Head from "@/components/next/Head";

const NotFind = () => {
  let router = useRouter();
  return (
    <div>
      <Head title="没有找到指定用户" />
      <Result
        title="没有找到对应的用户"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};
export default NotFind;
