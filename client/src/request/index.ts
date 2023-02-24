import { useState, useCallback } from "react";
/** 请求工具*/
function useResuest<T>(_fetch: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const fetch = useCallback(() => {
    setIsLoading(true);
    _fetch()
      .then((res: any) => setData(res))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    isError,
    data,
    fetch,
  };
}
export default useResuest;
