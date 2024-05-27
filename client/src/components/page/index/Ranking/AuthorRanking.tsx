import axios from "@axios";
import RankingList from "./RankingList";
import useFetch from "@/common/hooks/useFetch";

const AuthorRanking = () => {
  let { data, isLoading, error } = useFetch(() =>
    axios.get("/ranking/author").then(res => res.data.data)
  );
  return (
    <>
      <div className="bg-white shadow-sm">
        <RankingList data={data as any[]} isValidating={isLoading} error={!!error} />
      </div>
    </>
  );
};
export default AuthorRanking;
