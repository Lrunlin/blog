import { useState, startTransition } from "react";
import { Result, Table, Avatar, Image, Button, Modal, Input, message as messageAlert } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "@/layout/Admin/Base";

const LinkList = () => {
  let { data, error, mutate } = useSWR("link-list", () =>
    axios.get("/friendly-link").then(res => res.data.data)
  );

  if (error) {
    return <Result status="error" title="请求错误" />;
  }

  const [deleteLinkID, setDeleteLinkID] = useState<null | number>(null);
  const [message, setMessage] = useState("");
  function remove(id: number) {
    axios.delete(`/friendly-link/${id}`, { params: { message: message } }).then(res => {
      if (res.data.success) {
        messageAlert.success(res.data.message);
        mutate();
        startTransition(() => {
          setDeleteLinkID(null);
        });
        setMessage("");
      } else {
        messageAlert.error(res.data.message);
      }
    });
  }

  function adopt(id: number) {
    axios.put(`/friendly-link/${id}`).then(res => {
      if (res.data.success) {
        messageAlert.success(res.data.message);
        mutate();
      } else {
        messageAlert.error(res.data.message);
      }
    });
  }

  const columns = [
    {
      title: "网站名称",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Logo",
      dataIndex: "logo_url",
      render(logo_url: string) {
        return <Image height={40} src={logo_url} alt="Logo" />;
      },
      width: 220,
    },
    {
      title: "网址",
      dataIndex: "url",
      render: (url: string) => (
        <a href={url} target="_blank" className="w-48 block truncate">
          {url}
        </a>
      ),
      width: 200,
    },
    {
      title: "用户信息",
      dataIndex: "user_data",
      render: (user_data: any) => {
        return user_data ? (
          <Link href={`/admin/user/${user_data.id}`}>
            <Avatar src={user_data.avatar_url} alt="用户头像" />
          </Link>
        ) : (
          "未注册"
        );
      },
      width: 100,
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (id: number, item: any) => {
        return (
          <>
            <Button
              danger
              type="primary"
              onClick={() => (item.user_data ? setDeleteLinkID(id) : remove(item.id))}
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
            <Button
              type="primary"
              onClick={() => adopt(id)}
              icon={<CheckOutlined />}
              className="ml-4"
              disabled={item.state != 0}
            >
              通过
            </Button>
          </>
        );
      },
      width: 200,
    },
  ];
  return (
    <AdminLayout>
      <div className="piece">
        <Table rowKey="id" dataSource={data} columns={columns} />
      </div>
      <Modal
        title="确定删除友链"
        open={!!deleteLinkID}
        onOk={() => remove(deleteLinkID as number)}
        onCancel={() => setDeleteLinkID(null)}
        cancelText="取消"
        okText="确认删除"
      >
        <Input.TextArea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="如果你填写了回复消息，系统会发送邮箱通知对应的站长友链已被删除"
          rows={5}
        />
      </Modal>
    </AdminLayout>
  );
};
export default LinkList;
