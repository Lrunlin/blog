import useSWR from "swr";
import axios from "axios";
const useUserState = () => {
  let { data, mutate } = useSWR("user-state", () =>
    axios
      .get("/user/info")
      .then(res => {
        return res.data.success ? res.data.data : false;
      })
      .catch(err => {})
  );
  return [data || null, mutate];
};
export default useUserState;
