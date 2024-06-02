import Head from "@/components/next/Head";
import ProblemList from "@/components/page/problem/ProblemList";
import axios from "@axios";
import type { ProblemAttributes } from "@type/model-attribute";
import type { response } from "@type/common/response";

function getProblemList(page: number, type: "newest" | "noanswer") {
  return axios
    .get<response<{ total: number; list: ProblemAttributes[] }>>(`/problem/page/${page}`, {
      params: { type: type },
    })
    .then(res => res.data.data)
    .catch(err => null);
}

const Problem = async () => {
  let response = (await getProblemList(1, "newest")) as {
    total: number;
    list: ProblemAttributes[];
  };
  return (
    <>
      <Head title={`技术问答 - ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <ProblemList {...response} />
    </>
  );
};
export default Problem;
