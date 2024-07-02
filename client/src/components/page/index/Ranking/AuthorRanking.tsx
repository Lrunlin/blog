import axios from "@axios";
import useFetch from "@/common/hooks/useFetch";
import RankingList from "./RankingList";

const AuthorRanking = () => {
  let { data, isLoading, error } = useFetch(() =>
    axios.get("/ranking/author").then((res) => res.data.data),
  );
  return (
    <>
      <div className="bg-white shadow-sm">
        <RankingList
          data={data as any[]}
          isValidating={isLoading}
          error={!!error}
        />
      </div>
    </>
  );
};
export default AuthorRanking;
