import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

type FetchResult<T, J> = {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  error: AxiosError<T> | null;
  isLoading: boolean;
  refetch: (params?: J) => void;
};

export default function useFetch<T, J>(
  request: (param: J) => Promise<T>,
  manual = false
): FetchResult<T, J> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<T> | null>(null);
  const [isLoading, setIsLoading] = useState(!manual);

  const fetchData = async (param?: J) => {
    setIsLoading(true);
    try {
      const response = await request(param!);
      setData(response);
    } catch (error) {
      setError(error as AxiosError<T>);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, []);

  return {
    data,
    error,
    isLoading,
    setData,
    refetch: fetchData,
  };
}
