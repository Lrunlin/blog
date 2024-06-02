import axios from "@axios";
import Base from "@/layout/Base";
import Link from "next/link";
import { response } from "@type/response";

const SiteMap = async ({ params: { index } }: { params: { index: string } }) => {
  if (isNaN(+index)) {
    new Response(undefined, { status: 404 });
    return;
  }

  let pageCount = await axios.get("/sitemap").then(res => res.data.data.length);
  let data = await axios
    .get<response<{ id: number; title: string }[]>>(`/sitemap/list/${index}`)
    .then(res => res.data.data);

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

export const dynamic = "force-dynamic";