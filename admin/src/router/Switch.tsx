import { useEffect } from "react";
import type { FC } from "react";
import { Suspense, memo } from "react";
import { RouteObject, Router, useRoutes } from "react-router-dom";
import RouterList from "./list";
import { Spin } from "antd";
import type { RouterListType } from "./list";

const SetTitle: FC<{ title?: string }> = props => {
  useEffect(() => {
    document.title = props.title || "管理系统";
  }, [props]);
  return <></>;
};

const SetRouter = (list: RouterListType[]): RouteObject[] => {
  let mRouteTable: RouteObject[] = [];
  list.forEach(route => {
    mRouteTable.push({
      path: route.path,
      element: (
        <Suspense fallback={<Spin tip="Loading..." size="large" className="w-full h-full"></Spin>}>
          <>
            <route.element />
            {!route.children && <SetTitle title={route.title} />}
          </>
        </Suspense>
      ),
      children: route.children && SetRouter(route.children),
    });
  });
  return mRouteTable;
};
export default memo(() => useRoutes(SetRouter(RouterList)));
