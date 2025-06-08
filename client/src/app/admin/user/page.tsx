"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  DatePicker,
  Input,
  Popconfirm,
  Popover,
  Select,
  Table,
  Tooltip,
  message,
  notification,
} from "antd";
import axios from "@axios";
import dayjs from "@dayjs";
import type { response } from "@type/response";
import copy from "copy-to-clipboard";

const UserList = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: "用户昵称",
      dataIndex: "name",
      render: (name: string, item: any) => (
        <div className="w-16">
          <Link href={`/admin/user/${item.id}`} className="block text-center">
            <Avatar src={item.avatar_url} alt="用户头像" />
            <div className="w-full truncate">{name}</div>
          </Link>
        </div>
      ),
      width: 100,
    },
    {
      title: "文章发表",
      dataIndex: "article_count",
      width: 40,
    },
    {
      title: "文章收藏",
      dataIndex: "collection_count",
      width: 40,
    },
    {
      title: "关注",
      dataIndex: "followe_count",
      width: 40,
    },
    {
      title: "粉丝数",
      dataIndex: "follower_count",
      width: 40,
    },
    {
      title: "评论",
      dataIndex: "comment_count",
      width: 40,
    },
    {
      title: "用户信息",
      render: (id: number, item: any) => {
        return (
          <div>
            {item.github && (
              <a href={`https://github.com/${item.github}`} target="_blank">
                <img
                  src="/icon/admin/github.svg"
                  alt="github图标"
                  className="mr-4 w-5 cursor-pointer"
                />
              </a>
            )}
            {item.email && (
              <a href={`mailto:${item.email}`}>
                <img
                  src="/icon/admin/邮箱.svg"
                  alt="email"
                  className="mr-4 w-5 cursor-pointer"
                />
              </a>
            )}
          </div>
        );
      },
      width: 160,
    },
    {
      title: "注册时间",
      dataIndex: "create_time",
      width: 140,
      render: (create_time: string) => {
        return <DatePicker showTime defaultValue={dayjs(create_time)} />;
      },
    },
    {
      title: "其他信息",
      width: 60,
      render: (item: any) => {
        return (
          <Popover
            placement="topLeft"
            content={
              <div>
                {item.unit && (
                  <div className="flex">
                    <div className="w-12">单位:</div>
                    <span>{item.unit}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex">
                    <div className="w-12">地址:</div>
                    <span>{item.location}</span>
                  </div>
                )}
                {item.description && (
                  <div className="flex">
                    <div className="w-12">简介:</div>
                    <div className="w-40 break-all">{item.description}</div>
                  </div>
                )}
              </div>
            }
            trigger="hover"
          >
            <div className="cursor-pointer">触碰查看</div>
          </Popover>
        );
      },
    },
    {
      title: "注销",
      dataIndex: "id",
      width: 140,
      render: (id: number, val: any) => {
        return (
          <div>
            {val.state == 0 ? (
              <Button type="primary" onClick={() => recovery(id)}>
                恢复
              </Button>
            ) : process.env.AUTH_MODE == "session" ? (
              <Popconfirm
                placement="top"
                title={
                  <span>
                    注销用户:<span className="mx-1 font-bold">{val.name}</span>
                    ？
                  </span>
                }
                description={`注销后用户信息无法找回`}
                okText="确定"
                cancelText="取消"
                onConfirm={() => destroy(id)}
              >
                <Button danger disabled={val.state == 0}>
                  注销
                </Button>
              </Popconfirm>
            ) : (
              <Tooltip
                placement="top"
                title={"服务器未使用Session鉴权，禁止用户注销"}
              >
                <Button type="primary" disabled>
                  注销
                </Button>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const [key, setKey] = useState(+new Date()); //用于触发数据更新
  let [userId, setUserId] = useState("");
  const [state, setState] = useState<number | false>(false);
  useEffect(() => {
    setIsLoading(true);
    let params: { [key: string]: any } = {};
    if (state !== false) {
      params.state = state;
    }
    if (/^[\s\S]*.*[^\s][\s\S]*$/.test(userId)) {
      params.user_id = userId;
    }

    axios
      .get(`/user/list/${page}`, { params: params })
      .then((res) => {
        setData(res.data.data.list);
        startTransition(() => {
          setTotal(res.data.data.total);
        });
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, state, key]);

  /** 注销账号*/
  function destroy(id: number) {
    axios
      .post<response>(`/user/destroy/${id}`)
      .then((res) => {
        message.success(res.data.message);
        setKey((val) => ++val);
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err);
      });
  }
  /** 恢复账号*/
  function recovery(id: number) {
    axios
      .post<response<{ email: string; password: string }>>(
        `/user/recovery/${id}`,
      )
      .then((res) => {
        if (res.data.success) {
          setKey((val) => ++val);
          notification.success({
            message: "恢复成功",
            duration: 5,
            description: (
              <div>
                <div>
                  <div className="break-all">
                    <span className="font-bold">邮箱:</span>
                    <span className="ml-2">{res.data.data.email}</span>
                  </div>
                  <div className="break-all">
                    <span className="font-bold">密码:</span>
                    <span className="ml-2">{res.data.data.password}</span>
                  </div>
                </div>
                <Button
                  className="mt-4"
                  onClick={() => {
                    copy(
                      `邮箱:${res.data.data.email}   密码:${res.data.data.password}`,
                    );
                    message.success("复制成功");
                  }}
                >
                  点击复制
                </Button>
              </div>
            ),
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err);
      });
  }

  return (
    <>
      <div className="piece">
        <Select
          defaultValue={state}
          style={{ width: 120 }}
          onChange={setState}
          options={[
            { value: false, label: "全部" },
            { value: 1, label: "未注销" },
            { value: 0, label: "已注销" },
          ]}
        />
        <Input
          placeholder="根据用户ID搜索"
          className="!ml-8 !w-56"
          allowClear={true}
          onChange={(val) => {
            setUserId(val.target.value);
            // 空的时候重新请求
            if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(userId)) {
              startTransition(() => {
                setKey((val) => ++val);
              });
            }
          }}
        />
        <Button
          type="primary"
          onClick={() => setKey((val) => ++val)}
          className="ml-2"
          disabled={!/^[\s\S]*.*[^\s][\s\S]*$/.test(userId)}
        >
          搜索
        </Button>
      </div>
      <div className="piece mt-4">
        <Table
          loading={isLoading}
          pagination={{
            current: page,
            total: total,
            defaultPageSize: 10,
            onChange: (_page) => setPage(_page),
            position: ["bottomCenter"],
          }}
          columns={columns}
          rowKey="id"
          dataSource={data}
        />
      </div>
    </>
  );
};
export default UserList;
