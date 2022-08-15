import { lazy } from "react";
import type { FC, LazyExoticComponent } from "react";

const RouterList: RouterListType[] = [
  {
    path: "/login",
    element: lazy(() => import("@/page/login")),
  },
  {
    path: "",
    element: lazy(() => import("@/layout/Base")),
    children: [
      {
        path: "/",
        element: lazy(() => import("@/page/index")),
      },
      {
        path: "/article/write",
        element: lazy(() => import("@/page/article/write")),
      },
      {
        path: "/article/list",
        element: lazy(() => import("@/page/article/list")),
      },
      {
        path: "/article/:id",
        element: lazy(() => import("@/page/article/update")),
      },
      {
        path: "/type/list",
        element: lazy(() => import("@/page/type/type-list")),
      },
      {
        path: "/type/:id",
        element: lazy(() => import("@/page/type/uptate/type")),
      },
      {
        path: "/tag/:id",
        element: lazy(() => import("@/page/type/uptate/tag")),
      },
      {
        path: "/advertisement",
        element: lazy(() => import("@/page/advertisement/create")),
      },
      {
        path: "/advertisement/list",
        element: lazy(() => import("@/page/advertisement/list")),
      },
      {
        path: "/advertisement/:id",
        element: lazy(() => import("@/page/advertisement/update")),
      },
    ],
  },
];
export default RouterList;
interface RouterListType {
  path: string;
  element: LazyExoticComponent<FC<{}>>;
  children?: RouterListType[];
}
export type { RouterListType };
