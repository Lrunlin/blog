import { useState, useEffect } from "react";
function useRequest<T>(requsetFunction: () => Promise<T>, initValue?: T) {
  const [data, setData] = useState<typeof initValue | T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    requsetFunction()
      .then((res: any) => {
        res.success ? setData(res as unknown as T) : setIsError(true);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [key]);
  return {
    data: data,
    isLoading: isLoading,
    isError: isError,
    refresh: () => setKey(+new Date()+Math.random()),
  };
}
export default useRequest;
