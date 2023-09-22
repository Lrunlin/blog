import { GetServerSideProps } from "next";
import axios from "axios";
import type { FC } from "react";
import Base from "@/layout/Base";
import Link from "next/link";
import { useParams } from "next/navigation";

const SiteMap: FC<{ pageCount: number; data: { id: number; title: string }[] }> = ({
  pageCount,
  data,
}) => {
  let params = useParams();
  let index = params.index as string;
  return (
    <Base>
      <div>
        <div className="p-4 bg-white">
          <a
            className="text-gray-700"
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_HOST}/sitemap/index${index}.xml`}
          >
            SiteMap{index}.xml
          </a>
        </div>
        <main className="bg-white w-full p-6 mt-4 flex flex-wrap">
          {data.map(item => (
            <a
              key={`sitemap-id-${item.id}`}
              href={`/article/${item.id}`}
              target="_blank"
              className="block w-1/4 pr-6 text-gray-700 mb-3 truncate"
            >
              {item.title}
            </a>
          ))}
        </main>
        <footer className="bg-white w-full p-6 mt-4 mb-4 flex flex-wrap">
          {new Array(pageCount).fill(null).map((_, index) => (
            <Link
              key={`sitemap-index-${index}`}
              href={`/sitemap/${index + 1}`}
              className="border w-[calc(100%/13)] mb-2 text-center mr-4 border-solid border-gray-700 text-gray-700 rounded"
            >
              {index + 1}页
            </Link>
          ))}
        </footer>
      </div>
    </Base>
  );
};
export default SiteMap;

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  let index = +params!.index!;

  if (typeof index != "number") {
    res.statusCode = 404;
    res.end();
    return {
      props: {},
    };
  }

  let pageCount = await axios.get("/sitemap").then(res => res.data.data.length);
  let data = await axios.get(`/sitemap/list/${index}`).then(res => res.data.data);

  return {
    props: { pageCount, data },
  };
};
