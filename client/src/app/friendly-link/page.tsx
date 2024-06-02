import { useState, startTransition } from "react";
import axios from "@axios";
import { Modal, Form, Input, message, Collapse, Badge } from "antd";
import type { GetServerSideProps, NextPage } from "next";
import Header from "@/components/common/Header";
import Head from "@/components/next/Head";
import useUserData from "@/store/user/user-data";
import type { LinkAttributes } from "@type/model-attribute";
import type { userDataType } from "@type/common/user-data";
import type { response } from "@type/common/response";
import useUserSignModel from "@/store/user/user-sign-model-state";
import Link from "next/link";
import classNames from "classnames";
import UpLoad from "@/components/common/UpLoad";
import FriendlyLink from "@/components/page/friendly-link/FriendlyLink";

type linkItem = Pick<LinkAttributes, "id" | "name" | "logo_file_name" | "logo_url" | "url"> & {
  user_data?: userDataType;
};

const Links = async () => {
  let data = await axios.get<response<linkItem[]>>("/friendly-link").then(res => res.data.data);

  return (
    <>
      <Head title="友情链接" description="友情链接" keywords={["友情链接"]} />
      <Header />
      <FriendlyLink data={data} />
    </>
  );
};
export default Links;

