import { Input } from "antd";
import { useRouter } from "next/router";

const { Search } = Input;
const SearchBox = () => {
  let router = useRouter();

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

  return (
    <>
      <Search
        placeholder="搜索"
        allowClear
        onSearch={val => onSearch(val)}
        maxLength={30}
        style={{ width: 200 }}
      />
    </>
  );
};
export default SearchBox;
