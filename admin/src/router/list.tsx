import { lazy } from "react";
import type { FC, LazyExoticComponent } from "react";

const RouterList: RouterListType[] = [
  {
    path: "/login",
    element: lazy(() => import("@/page/login")),
    title: "登录",
  },
  {
    path: "/statistics",
    element: lazy(() => import("@/page/statistics")),
    title: "统计",
  },
  {
    path: "/",
    element: lazy(() => import("@/layout/Base")),
    children: [
      {
        path: "/",
        element: lazy(() => import("@/page/index")),
        title: "首页",
      },
      {
        path: "/article/write",
        element: lazy(() => import("@/page/article/write")),
        title: "文章编写",
      },
      {
        path: "/article/list",
        element: lazy(() => import("@/page/article/list")),
        title: "文章列表",
      },
      {
        path: "/article/:id",
        element: lazy(() => import("@/page/article/update")),
        title: "文章详情",
      },
      {
        path: "/type/list",
        element: lazy(() => import("@/page/type/type-list")),
        title: "类型列表",
      },
      {
        path: "/type/:id",
        element: lazy(() => import("@/page/type/uptate/type")),
        title: "类型详情",
      },
      {
        path: "/tag/:id",
        element: lazy(() => import("@/page/type/uptate/tag")),
        title: "标签详情",
      },
      {
        path: "/advertisement",
        element: lazy(() => import("@/page/advertisement/create")),
        title: "发布推广",
      },
      {
        path: "/advertisement/list",
        element: lazy(() => import("@/page/advertisement/list")),
        title: "推广列表",
      },
      {
        path: "/advertisement/:id",
        element: lazy(() => import("@/page/advertisement/update")),
        title: "修改推广",
      },
      {
        path: "/link/create",
        element: lazy(() => import("@/page/link/create")),
        title: "友链添加",
      },
      {
        path: "/link",
        element: lazy(() => import("@/page/link/list")),
        title: "友链列表",
      },
      {
        path: "/comment",
        element: lazy(() => import("@/page/comment/index")),
        title: "评论列表",
      },
      {
        path: "/user",
        element: lazy(() => import("@/page/user/list")),
        title: "用户列表",
      },
      {
        path: "/user/:id",
        element: lazy(() => import("@/page/user/data")),
        title: "用户列表",
      },
      {
        path: "*",
        element: lazy(() => import("@/page/NoFound")),
        title: "404",
      },
    ],
  },
];
export default RouterList;
interface RouterListType {
  path: string;
  element: LazyExoticComponent<FC<{}>>;
  children?: RouterListType[];
  title?: string;
}
export type { RouterListType };
