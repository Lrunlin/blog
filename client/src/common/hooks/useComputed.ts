import { useState, useEffect } from "react";
import type { DependencyList } from "react";

const useComputed = <T>(factory: () => T, deps: DependencyList): [T, (v: T) => void] => {
  const [state, setState] = useState<T>(factory);

  useEffect(() => {
    setState(factory);
  }, deps);

  return [state, setState];
};

export default useComputed;
