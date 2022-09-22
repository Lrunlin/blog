import useSWR from "swr";
import classNames from "classnames";
import getAdvertisementList from "@/request/advertisement";
/** 文章页面的右侧推广内容*/
const Aside = () => {
  let { data } = useSWR("/advertisement-article", () => getAdvertisementList("article"));
  return (
    <>
      <aside className="sm:hidden">
        <div className="w-60">{/* 占位用的防止左侧内容偏移 */}</div>
        {data &&
          data.map((item, index) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              key={item.id}
              className={classNames(["w-60 block relative group cursor-pointer", index && "mt-2"])}
            >
              <img src={item.poster_url} alt="推广" className="w-full" />
            </a>
          ))}
      </aside>
    </>
  );
};
export default Aside;
