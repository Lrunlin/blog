import AdminLayout from "@/layout/Admin/Base";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
const NoFound = () => {
  let router = useRouter();
  return (
    <AdminLayout>
      <Result
        status="404"
        title="404"
        subTitle="没有找到指定页面"
        extra={
          <Button type="primary" onClick={() => router.replace("/admin")}>
            首页
          </Button>
        }
      />
    </AdminLayout>
  );
};
export default NoFound;
