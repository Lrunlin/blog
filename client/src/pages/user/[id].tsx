import { NextPage } from "next";
import { Skeleton } from "antd";
import NotFind from "@/components/page/user/index/NotFind";
import UserData from "@/components/page/user/index/UserData";
import { useParams } from "next/navigation";
import type { UserAttributes } from "@type/model-attribute";
import Layout from "@/layout/Base";
import axios from "axios";
import useFetch from "@/common/hooks/useFetch";

const User: NextPage = () => {
  let params = useParams();
  let id = params.id as string;

  let { data, isLoading } = useFetch(
    () =>
      axios
        .get(`/user/data/${id}`)
        .then(res => res.data.data as UserAttributes | null)
        .catch(() => null),
    { deps: [id] }
  );

  return (
    <Layout className="container-xs">
      {isLoading ? (
        <div className="w-full bg-white p-4">
          <Skeleton active paragraph={{ rows: 5 }} />
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : data ? (
        <UserData data={data} key={id} />
      ) : (
        <NotFind />
      )}
    </Layout>
  );
};
export default User;
