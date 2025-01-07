import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import axios from "@axios";
import readingRecords from "@/common/modules/readingRecords";
import HightLight from "@/layout/Content/HightLight";
import ProblemDetail from "@/components/page/problem/ProblemDetail";

const Problem = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const { id } = params;

  const cookie = await cookies();
  const header = await headers();
  const token = cookie.get("token");

  let data = await axios(`/problem/${id}`, {
    headers: { authorization: token?.value },
  })
    .then((res) => res.data.data)
    .catch((err) => null);

  if (!data) {
    notFound();
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
