import axios from "@axios";
import RankingList from "./RankingList";
import useFetch from "@/common/hooks/useFetch";

const FunsRanking = () => {
  let { data, isLoading, error } = useFetch(() =>
    axios.get("/ranking/funs").then(res => res.data.data)
  );
  return (
    <>
      <div className="bg-white shadow-sm">
        <RankingList data={data as any[]} isValidating={isLoading} error={!!error} />
      </div>
    </>
  );
};
export default FunsRanking;
