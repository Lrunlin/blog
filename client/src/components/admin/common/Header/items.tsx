import {
  HomeOutlined,
  BookOutlined,
  TagOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
  UserOutlined,
  FileImageOutlined,
  LinkOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";

interface MenuItem {
  href?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  key: string;
}
const items = [
  {
    href: "/admin",
    label: "首页",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    icon: <BookOutlined />,
    children: [
      {
        href: "/admin/article/list",
        label: "文章列表",
      },
      {
        href: "/admin/article/write",
        label: "发布文章",
      },
    ],
  },
  {
    label: "广告投放",
    icon: <AppstoreAddOutlined />,
    children: [
      {
        href: "/admin/advertisement",
        label: "新增",
      },
      {
        href: "/admin/advertisement/list",
        label: "广告列表",
      },
    ],
  },
  {
    label: "主题管理",
    icon: <AppstoreOutlined />,
    children: [
      {
        href: "/admin/theme",
        label: "主题列表",
      },
      {
        href: "/admin/theme/create",
        label: "主题添加",
      },
    ],
  },
  {
    label: "友情链接",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        href: "/admin/friendly-link",
        label: "友链列表",
      },
      {
        href: "/admin/friendly-link/create",
        label: "添加友链",
      },
    ],
  },
  {
    label: "类型管理",
    icon: <TagOutlined />,
    href: "/admin/type",
  },
  {
    label: "评论列表",
    href: "/admin/comment",
    icon: <CommentOutlined />,
  },
  {
    label: "用户列表",
    href: "/admin/user",
    icon: <UserOutlined />,
  },
  {
    label: "图片管理",
    href: "/admin/oss",
    icon: <FileImageOutlined />,
  },
  {
    label: "站外链接跳转管理",
    href: "/admin/external-link",
    icon: <LinkOutlined />,
  },
];

// 递归添加key
function setKey(obj: MenuItem[]) {
  obj.forEach((item, index) => {
    if (!item.key) {
      item.key = `${item.href}menu-key${item.label}${index}`;
    }
    item.children && setKey(item.children);
    item.href && (item.label = <Link href={item.href}>{item.label}</Link>);
  });
}
setKey(items as unknown as MenuItem[]);

export default items as unknown as MenuItem[];
