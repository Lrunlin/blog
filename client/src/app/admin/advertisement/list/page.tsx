"use client";

import { useRouter } from "next/navigation";
import { Button, Image, Result, Skeleton, Table, message } from "antd";
import axios from "@axios";
import dayjs from "@dayjs";
import useFetch from "@/common/hooks/useFetch";
import AdminLayout from "@/layout/Admin/Base";

let positionMapping = {
  index: "首页",
  article: "文章页面",
  creator: "创作者中心",
};
function Position(position: keyof typeof positionMapping) {
  return positionMapping[position];
}
const APP = () => {
  let { data, error, isLoading, setData } = useFetch(() =>
    axios.get("/advertisement").then((res) => res.data.data),
  );

  let router = useRouter();
  const columns = [
    {
      title: "海报",
      dataIndex: "poster_url",
      render(url: string) {
        return <Image width={150} src={url} alt="海报" />;
      },
      width: 200,
    },
    {
      title: "链接地址",
      dataIndex: "url",
      render(url: string | null) {
        return url ? (
          <div className="w-60 truncate">
            <a href={url} target="_blank">
              {url}
            </a>
          </div>
        ) : (
          "无链接"
        );
      },
      width: 200,
    },
    {
      title: "显示位置",
      dataIndex: "position",
      render(position: string) {
        return <div>{Position(position as any)}</div>;
      },
      width: 200,
    },
    {
      title: "发布时间",
      dataIndex: "create_time",
      render(time: string) {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "编辑",
      dataIndex: "id",
      render(id: string) {
        return (
          <Button
            onClick={() => router.push(`/admin/advertisement/${id}`)}
            size="small"
            type="primary"
          >
            编辑
          </Button>
        );
      },
    },
    {
      title: "删除",
      dataIndex: "id",
      render(id: string) {
        return (
          <Button onClick={() => remove(id)} size="small" type="primary" danger>
            删除
          </Button>
        );
      },
    },
  ];

  function remove(id: string) {
    axios.delete(`/advertisement/${id}`).then((res) => {
      if (res.data.success) {
        message.success(res.data.message);
        setData((_data: any[]) => _data.filter((item) => item.id != id));
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <AdminLayout>
      {data && (
        <div className="piece">
          <Table
            dataSource={data}
            rowKey="id"
            columns={columns}
            pagination={{
              position: ["bottomCenter"],
            }}
          />
        </div>
      )}
      {error && <Result status="error" title="请求错误"></Result>}
      {isLoading && (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
    </AdminLayout>
  );
};
export default APP;
