import { useState, startTransition } from "react";
import { Result, Table, Avatar, Image, Button, Modal, Input, message as messageAlert } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "@/layout/Admin/Base";
import useFetch from "@/common/hooks/useFetch";

const LinkList = () => {
  let { data, error, isLoading, refetch } = useFetch(() =>
    axios.get("/friendly-link").then(res => res.data.data)
  );

  if (error) {
    return <Result status="error" title="请求错误" />;
  }

  const [deleteLinkID, setDeleteLinkID] = useState<null | number>(null);
  const [message, setMessage] = useState("");
  function remove(id: number) {
    axios
      .delete(`/friendly-link/${id}`, { params: { message: message } })
      .then(res => {
        if (res.data.success) {
          messageAlert.success(res.data.message);
          refetch();
          startTransition(() => {
            setDeleteLinkID(null);
          });
          setMessage("");
        } else {
          messageAlert.error(res.data.message);
        }
      })
      .catch(err => {
        messageAlert.error(err.message);
      });
  }

  function adopt(id: number) {
    axios
      .put(`/friendly-link/${id}`)
      .then(res => {
        if (res.data.success) {
          messageAlert.success(res.data.message);
          refetch();
        } else {
          messageAlert.error(res.data.message);
        }
      })
      .catch(err => {
        messageAlert.error(err.message);
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
      width: 150,
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
      title: "状态",
      render: (values: any) => {
        const ResponseTimeIndicator = () => {
          let colorClass = "";
          let responseTime = values.response_time;
          if (responseTime < 300) {
            colorClass = "text-green-500";
          } else if (responseTime >= 300 && responseTime < 600) {
            colorClass = "text-blue-500";
          } else if (responseTime >= 600 && responseTime < 1000) {
            colorClass = "text-yellow-500";
          } else {
            colorClass = "text-red-400";
          }

          return <div className={`${colorClass} font-bold`}>{values.response_time}ms</div>;
        };

        return values.response_time ? (
          <ResponseTimeIndicator />
        ) : values.response_error ? (
          <div className="text-red-400 font-bold">错误</div>
        ) : (
          "无"
        );
      },
      width: 80,
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
        <Table loading={isLoading} rowKey="id" dataSource={data} columns={columns} />
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
