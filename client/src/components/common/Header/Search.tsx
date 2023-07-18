import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "antd";

const { Search } = Input;
const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onSearch(val: string) {
    if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(val)) {
      return;
    }
    router.push(`/search?keyword=${val}`);
  }

  useEffect(() => {
    if (pathname == "/search" && searchParams!.get("keyword")) {
      setKeyword(searchParams!.get("keyword") as string);
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
