import { useState, useEffect, startTransition } from "react";
import { message, Table, Avatar, DatePicker, Popover } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import github from "@/assets/icon/github.svg";
import email from "@/assets/icon/邮箱.svg";
import qq from "@/assets/icon/QQ.svg";
import copy from "copy-to-clipboard";

const UserList = () => {

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const columns = [
    {
      title: "用户昵称",
      dataIndex: "name",
      render: (name: string, item: any) => (
        <div className="w-16">
          <Link to={`/user/${item.id}`} className="block text-center">
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
      dataIndex: "followee_count",
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
      //   dataIndex: "id",
      render: (id: number, item: any) => {
        return (
          <div>
            {item.github && (
              <a href={item.github} target="_blank">
                <img src={github} alt="github图标" className="w-5 cursor-pointer mr-4" />
              </a>
            )}
            {item.email && (
              <a href={`mailto:${item.email}`}>
                <img src={email} alt="email" className="w-5 cursor-pointer mr-4" />
              </a>
            )}
            {item.qq && (
              <img
                onClick={() => {
                  copy(item.qq);
                  message.success("复制成功");
                }}
                src={qq}
                alt="qq icon"
                className="w-5 cursor-pointer mr-4"
              />
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
        return <DatePicker showTime defaultValue={moment(create_time)} />;
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
  ];
  useEffect(() => {
    axios.get(`/user/list/${page}`).then(res => {
      if (res.data.success) {
        setData(res.data.data.list);
        startTransition(() => {
          setTotal(res.data.data.total);
        });
      } else {
        message.error(res.data.message);
      }
    });
  }, [page]);

  return (
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
  );
};
export default UserList;
