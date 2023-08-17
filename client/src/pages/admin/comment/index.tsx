import { useState, useEffect, startTransition } from "react";
import axios from "axios";
import { message, Table, Avatar, Image, Button, Popover, DatePicker } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import AdminLayout from "@/layout/Admin/Base";

const Comment = () => {
  const columns = [
    {
      title: "文章ID",
      dataIndex: "belong_id",
      render: (article_id: number) => (
        <Link href={`/admin/article/${article_id}`}>{article_id}</Link>
      ),
      width: 160,
    },
    {
      title: "用户信息",
      dataIndex: "user_data",
      render: (user_data: any) => (
        <Link href={`/admin/user/${user_data.id}`}>
          <Avatar src={user_data.avatar_url} />
        </Link>
      ),
      width: 120,
    },
    {
      title: "引用图片",
      dataIndex: "comment_pics",
      render: (comment_pics: any) => (
        <>
          {comment_pics ? (
            <Image width={100} src={comment_pics} />
          ) : (
            <div className="w-24 h-10 flex items-center justify-center">未上传图片</div>
          )}
        </>
      ),
      width: 180,
    },
    {
      title: "内容",
      dataIndex: "content",
      render: (content: any) => {
        return (
          <Popover
            placement="topLeft"
            content={<div className="break-all w-52">{content}</div>}
            trigger="hover"
          >
            <div className="break-all line-clamp-2 w-48 cursor-pointer">{content}</div>
          </Popover>
        );
      },
      width: 200,
    },
    {
      title: "评论时间",
      dataIndex: "create_time",
      render: (create_time: any) => {
        return (
          <DatePicker
            inputReadOnly={true}
            allowClear={false}
            showTime
            defaultValue={dayjs(create_time)}
          />
        );
      },
      width: 120,
    },
    {
      title: "删除",
      dataIndex: "id",
      render: (id: number) => (
        <Button danger onClick={() => remove(id)}>
          删除
        </Button>
      ),
      width: 80,
    },
  ];

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);

  function remove(id: number) {
    axios
      .delete(`/comment/${id}`)
      .then(res => {
        message.success(res.data.message);
        setData(_data => _data.filter(item => item.id != id));
      })
      .catch(err => {
        message.error(err.message);
      });
  }
  useEffect(() => {
    axios.get(`/comment/list/page/${page}`, { params: {} }).then(res => {
      if (res.data.success) {
        startTransition(() => {
          setData(res.data.data.list);
        });
        setTotal(res.data.data.total);
      } else {
        message.error(res.data.message);
      }
    });
  }, [page]);

  // 修改审阅字段
  useEffect(() => {
    let list = data.filter(item => !item.is_review).map(item => item.id);
    if (list.length) {
      axios
        .put("/comment", { id: list })
        .then(() => {})
        .catch(() => {});
    }
  }, [data]);

  return (
    <AdminLayout>
      <div className="piece">
        <Table
          pagination={{
            current: page,
            total: total,
            defaultPageSize: 10,
            onChange: _page => setPage(_page),
          }}
          columns={columns}
          rowKey="id"
          dataSource={data}
        />
      </div>
    </AdminLayout>
  );
};
export default Comment;
