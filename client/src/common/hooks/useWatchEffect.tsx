"use client";

import { useEffect, useRef } from "react";

// 定义回调函数的类型，保证 oldValue 和 newValue 类型与 deps 类型一致
type WatchCallback<TDeps extends readonly any[]> = (params: {
  oldValue: TDeps | undefined;
  newValue: TDeps;
  firstExec: boolean;
}) => void | (() => void);

/**
 * 自定义 useWatch hook，类似 useEffect，但提供 oldValue, newValue 和 firstExec 作为参数
 * @param callback 回调函数，类似于 useEffect 的第一个参数
 * @param deps 可选的依赖数组，类似于 useEffect 的第二个参数，类型为数组
 */
function useWatchEffect<TDeps extends readonly any[]>(
  callback: WatchCallback<TDeps>,
  deps?: TDeps,
) {
  const isFirstRun = useRef(true); // 标记是否第一次运行
  const previousDeps = useRef(null as unknown as TDeps); // 保存上一次的依赖项

  useEffect(() => {
    const firstExec = isFirstRun.current; // 是否为第一次执行
    const oldValue = previousDeps.current; // 上一次的依赖项
    const newValue = deps || ([] as unknown as TDeps); // 当前的依赖项，若无 deps 则使用空数组作为初始值

    const cleanup = callback({ oldValue, newValue, firstExec }); // 执行回调函数

    // 更新 isFirstRun 和 previousDeps
    isFirstRun.current = false; // 第一次执行后，标记为 false
    previousDeps.current = newValue; // 保存当前依赖项为旧值

    // 如果有清理函数，返回它
    return cleanup;
  }, deps); // 依赖于传递的 deps 数组或 undefined
}

export default useWatchEffect;
