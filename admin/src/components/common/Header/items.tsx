import {
  HomeOutlined,
  BookOutlined,
  TagOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface MenuItem {
  href?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  key: string;
}
const items = [
  {
    href: "/",
    label: "首页",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    icon: <BookOutlined />,
    children: [
      {
        href: "/article/list",
        label: "文章列表",
      },
      {
        href: "/article/write",
        label: "发布文章",
      },
    ],
  },
  {
    label: "类型管理",
    icon: <TagOutlined />,
    children: [
      {
        href: "/type/list",
        label: "类型列表",
      },
    ],
  },
  {
    label: "广告投放",
    icon: <AppstoreAddOutlined />,
    children: [
      {
        href: "/advertisement",
        label: "新增",
      },
      {
        href: "/advertisement/list",
        label: "广告列表",
      },
    ],
  },
  {
    label: "友情链接",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        href: "/link",
        label: "友链列表",
      },
      {
        href: "/link/create",
        label: "添加友链",
      },
    ],
  },
  {
    label: "评论列表",
    href: "/comment",
    icon: <CommentOutlined />,
  },
  {
    label: "用户列表",
    href: "/user",
    icon: <UserOutlined />,
  },
];

// 递归添加key
function setKey(obj: MenuItem[]) {
  obj.forEach((item, index) => {
    if (!item.key) {
      item.key = `${item.href}menu-key${item.label}${index}`;
    }
    item.children && setKey(item.children);
    item.href && (item.label = <Link to={item.href}>{item.label}</Link>);
  });
}
setKey(items as unknown as MenuItem[]);

export default items as unknown as MenuItem[];
