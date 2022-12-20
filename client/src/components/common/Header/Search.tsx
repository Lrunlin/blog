import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "antd";

const { Search } = Input;
const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  function onSearch(val: string) {
    if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(val)) {
      return;
    }
    router.push({
      pathname: "/search",
      query: {
        keyword: val,
      },
    });
  }

  useEffect(() => {
    if (router.pathname == "/search" && router.query.keyword) {
      setKeyword(router.query.keyword as string);
    }
  }, []);

  return (
    <>
      <Search
        value={keyword}
        className="sm:hidden"
        placeholder="搜索"
        allowClear
        onSearch={val => onSearch(val)}
        maxLength={30}
        style={{ width: 200 }}
        onChange={e => setKeyword(e.target.value)}
      />
    </>
  );
};
export default SearchBox;
