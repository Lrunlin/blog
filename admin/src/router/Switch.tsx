import { Suspense, memo } from "react";
import { RouteObject, useRoutes } from "react-router";
import RouterList from "./list";
import {  Spin } from 'antd';

import type { RouterListType } from "./list";
const SetRouter = (list: RouterListType[]): RouteObject[] => {
  let mRouteTable: RouteObject[] = [];
  list.forEach(route => {
    mRouteTable.push({
      path: route.path,
      element: (
        <Suspense fallback={<Spin tip="Loading..." size="large" className="w-full h-full"></Spin>}>
          <route.element />
        </Suspense>
      ),
      children: route.children && SetRouter(route.children),
    });
  });
  return mRouteTable;
};
export default memo(() => useRoutes(SetRouter(RouterList)));
