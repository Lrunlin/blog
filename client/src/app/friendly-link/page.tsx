import axios from "@axios";
import type { response } from "@type/common/response";
import type { userDataType } from "@type/common/user-data";
import type { LinkAttributes } from "@type/model-attribute";
import Header from "@/components/common/Header";
import Head from "@/components/next/Head";
import FriendlyLink from "@/components/page/friendly-link/FriendlyLink";

type linkItem = Pick<
  LinkAttributes,
  "id" | "name" | "logo_file_name" | "logo_url" | "url"
> & {
  user_data?: userDataType;
};

const Links = async () => {
  let data = await axios
    .get<response<linkItem[]>>("/friendly-link")
    .then((res) => res.data.data);

  return (
    <>
      <Head title="友情链接" description="友情链接" keywords={["友情链接"]} />
      <Header />
      <FriendlyLink data={data} />
    </>
  );
};
export default Links;
