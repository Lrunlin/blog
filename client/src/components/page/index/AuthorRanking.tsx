import { Avatar } from "antd";
import useSWR from "swr";
import axios from "axios";

const AuthorRanking = () => {
  let { data, isValidating, error } = useSWR<any[]>("author-ranking", () =>
    axios.get("/author-ranking").then(res => res.data.data)
  );
  return (
    <>
      <div className="bg-white mt-3 shadow-sm">
        <div className="py-3 px-2 border-b-solid border-slate-200">🎖️作者榜</div>
        {isValidating && <div className="bg-gray-200 h-60"></div>}
        {error && <div className="bg-gray-100 h-60 text-center">加载错误</div>}
        <div className="px-2">
          {data &&
            data.map(item => (
              <div key={item.id} className="mt-2 py-2 flex">
                <Avatar size={40} src={item.avatar_url}>
                  {(item.name as string).substring(0, 1).toLocaleUpperCase()}
                </Avatar>
                <div className="ml-2">
                  <p className="m-0">{item.name}</p>
                  <p className="m-0 w-32 text-xs text-slate-600 truncate">
                    {item.description || item.unit || item.location || item.site}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default AuthorRanking;
