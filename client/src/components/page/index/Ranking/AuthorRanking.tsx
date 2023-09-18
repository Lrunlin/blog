import useSWR from "swr";
import axios from "axios";
import RankingList from "./RankingList";

const AuthorRanking = () => {
  let { data, isValidating, error } = useSWR<any[]>("/ranking/author", () =>
    axios.get("/ranking/author").then(res => res.data.data)
  );
  return (
    <>
      <div className="bg-white shadow-sm">
        <RankingList data={data as any[]} isValidating={isValidating} error={error} />
      </div>
    </>
  );
};
export default AuthorRanking;
