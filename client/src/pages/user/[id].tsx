import { NextPage } from "next";
import { Skeleton } from "antd";
import NotFind from "@/components/page/user/index/NotFind";
import UserData from "@/components/page/user/index/UserData";
import useSWR from "swr";
import { useParams } from "next/navigation";
import type { UserAttributes } from "@type/model-attribute";
import Layout from "@/layout/Base";
import axios from "axios";

const User: NextPage = () => {
  let params = useParams();
  let id = params.id as string;
  let { data, isValidating } = useSWR(`user-data-${id}`, () =>
    axios
      .get(`/user/data/${id}`)
      .then(res => res.data.data as UserAttributes | null)
      .catch(() => null)
  );

  return (
    <Layout className="container-xs">
      {isValidating ? (
        <div className="w-full bg-white p-4">
          <Skeleton active paragraph={{ rows: 5 }} />
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : data ? (
        <UserData data={data} />
      ) : (
        <NotFind />
      )}
    </Layout>
  );
};
export default User;
