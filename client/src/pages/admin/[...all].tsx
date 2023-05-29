import AdminLayout from "@/layout/Admin/Base";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import Head from "@/components/next/Head";

const NoFound = () => {
  let router = useRouter();
  return (
    <AdminLayout>
      <Head title={`404 - ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
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
