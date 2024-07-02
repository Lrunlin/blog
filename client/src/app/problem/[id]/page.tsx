import { cookies, headers } from "next/headers";
import axios from "@axios";
import readingRecords from "@/common/modules/readingRecords";
import HightLight from "@/layout/Content/HightLight";
import ProblemDetail from "@/components/page/problem/ProblemDetail";

const Problem = async ({ params: { id } }: { params: { id: string } }) => {
  const cookie = cookies();
  const header = headers();
  const token = cookie.get("token");

  let data = await axios(`/problem/${id}`, {
    headers: { authorization: token?.value },
  })
    .then((res) => res.data.data)
    .catch((err) => null);

  if (!data) {
    new Response(undefined, { status: 404 });
  } else {
    readingRecords(header, id, "problem");
  }

  return (
    <>
      {data.language && <HightLight language={data.language} />}
      <ProblemDetail data={data} />
    </>
  );
};
export default Problem;
