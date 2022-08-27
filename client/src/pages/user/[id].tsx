import { GetServerSideProps, NextPage } from "next";
import NotFind from "@/components/page/user/index/NotFind";
import UserData from "@/components/page/user/index/UserData";

import type { UserAttributes } from "@type/model-attribute";
import Layout from "@/layout/Base";
import axios from "axios";


const User: NextPage<{ data: UserAttributes | null }> = props => {
  return (
    <Layout className="container-xs">
      {props.data ? <UserData data={props.data} /> : <NotFind />}
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  let data = await axios.get(`/user/data/${ctx?.params?.id}`).then(res => res.data.data);
  return {
    props: { data: data },
  };
};
export default User;
