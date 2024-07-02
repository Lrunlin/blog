"use client";

import { useEffect, useRef, useState } from "react";
import type { DependencyList, Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

type FetchResult<T, J> = {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  error: AxiosError<T> | null;
  isLoading: boolean;
  refetch: (params?: J) => void;
};

interface optionType {
  /** 是否手动请求*/
  manual?: true;
  /** 依赖数组，触发自动更新*/
  deps?: DependencyList;
  /** 缓存Key*/
  key?: string;
}

let cache: { [key: string]: () => Promise<any> } = {};

export const refetchKey = (key: string) => {
  if (cache[key]) cache[key]();
};

export default function useFetch<T, J>(
  request: (param: J) => Promise<T>,
  option: optionType = { deps: [] },
): FetchResult<T, J> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<T> | null>(null);
  const [isLoading, setIsLoading] = useState(!option.manual);

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

  if (option.key) {
    cache[option.key] = fetchData;
  }

  // 如果是自动的就等自动执行完，在允许deps
  let allowFetch = useRef(option.manual);
  useEffect(() => {
    if (option.deps?.length && allowFetch.current) {
      fetchData();
    }
  }, option.deps);

  useEffect(() => {
    if (!option.manual) {
      fetchData();
      setTimeout(() => {
        allowFetch.current = true;
      }, 0);
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
