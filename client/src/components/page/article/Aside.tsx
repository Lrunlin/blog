import useSWR from "swr";
import classNames from "classnames";
import getAdvertisementList from "@/request/advertisement";
const Aside = () => {
  let { data } = useSWR("/advertisement-article", () => getAdvertisementList());
  return (
    <>
      <aside>
        {data &&
          data.map((item, index) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              key={item.id}
              className={classNames(["w-60 block relative group cursor-pointer", index && "mt-2"])}
            >
              <img src={item.cover} alt="推广" className="w-full" />
            </a>
          ))}
      </aside>
    </>
  );
};
export default Aside;
