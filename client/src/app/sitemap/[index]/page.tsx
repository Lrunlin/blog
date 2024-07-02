import Link from "next/link";
import axios from "@axios";
import { response } from "@type/response";
import Base from "@/layout/Base";

const SiteMap = async ({
  params: { index },
}: {
  params: { index: string };
}) => {
  if (isNaN(+index)) {
    new Response(undefined, { status: 404 });
    return;
  }

  let pageCount = await axios
    .get("/sitemap")
    .then((res) => res.data.data.length);
  let data = await axios
    .get<response<{ id: number; title: string }[]>>(`/sitemap/list/${index}`)
    .then((res) => res.data.data);

  return (
    <Base>
      <div>
        <div className="bg-white p-4">
          <a
            className="text-gray-700"
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_HOST}/sitemap/index${index}.xml`}
          >
            SiteMap{index}.xml
          </a>
        </div>
        <main className="mt-4 flex w-full flex-wrap bg-white p-6">
          {data.map((item) => (
            <a
              key={`sitemap-id-${item.id}`}
              href={`/article/${item.id}`}
              target="_blank"
              className="mb-3 block w-1/4 truncate pr-6 text-gray-700"
            >
              {item.title}
            </a>
          ))}
        </main>
        <footer className="mb-4 mt-4 flex w-full flex-wrap bg-white p-6">
          {new Array(pageCount).fill(null).map((_, index) => (
            <Link
              key={`sitemap-index-${index}`}
              href={`/sitemap/${index + 1}`}
              className="mb-2 mr-4 w-[calc(100%/13)] rounded border border-solid border-gray-700 text-center text-gray-700"
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

export const dynamic = "force-dynamic";
