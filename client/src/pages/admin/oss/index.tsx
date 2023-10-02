import { useState, useEffect } from "react";
import AdminLayout from "@/layout/Admin/Base";
import axios from "axios";
import { Button, Alert, Table, message, Card } from "antd";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { DisconnectOutlined, LinkOutlined } from "@ant-design/icons";
dayjs.extend(duration);

const OSS = () => {
  const [info, setInfo] = useState<null | { code: -1 | 0 | 1 | 2 | null; message: string }>(null);
  const [deleteCode, setDeleteCode] = useState<null | 0 | 1 | 2>(null);
  const [list, setList] = useState<
    {
      id: string;
      name: string;
      oss_count: number;
      database_count: number;
      delete_count: number;
    }[]
  >();
  const [time, setTime] = useState<Date>();
  const [messageList, setMessageList] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  function start() {
    setMessageList([]);
    setList(undefined);
    socket!.emit("start");
  }
  function remove() {
    socket!.emit("delete");
  }

  useEffect(() => {
    const newSocket = io(`${axios.defaults.baseURL}`, {
      path: "/oss",
      transports: ["websocket"],
      withCredentials: true,
    });
    setSocket(newSocket);
    newSocket.on("connect", () => {
      setConnect(true);
      // 服务端状态初始化
      newSocket.on("info", params => {
        setInfo(params);
        setDeleteCode(params.deleteCode);
      });
      // 结果列表获取
      newSocket.on("list", params => {
        setTime(params.time);
        setList(params.data);
      });
      // 删除情况获取
      newSocket.on("delete-schedule", params => {
        setDeleteCode(params.code);
        if (params.code == 1) {
          message.success("删除成功");
        }
      });
      // 消息、日志打印
      newSocket.on("message", params => {
        setMessageList(message => [params.message, ...message].slice(0, 50));
      });
      // 断开链接
      newSocket.on("disconnect", function () {
        setConnect(false);
      });
    });
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const [countdown, setCountdown] = useState("");
  let timer: any;
  useEffect(() => {
    function setTime() {
      const du = dayjs.duration(+new Date(time!) + 86_400_000 - +new Date(), "ms"),
        hours = du.get("hours"),
        mins = du.get("minutes"),
        ss = du.get("seconds");
      setCountdown(hours + "时" + mins + "分" + ss + "秒");
    }
    timer = setInterval(() => {
      setTime();
    });
    setTime();
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const [connect, setConnect] = useState(false);

  return (
    <AdminLayout>
      <div className="flex justify-end text-4xl">
        <div
          className="bg-gray-300 h-14 w-14 flex justify-center items-center rounded-full cursor-pointer"
          title={connect ? "已连接" : "已断开"}
        >
          {connect ? (
            <LinkOutlined style={{ color: "green" }} />
          ) : (
            <DisconnectOutlined style={{ color: "red" }} />
          )}
        </div>
      </div>
      <Alert
        className="!mt-4"
        message="删除30天以前上传OSS但是未在数据库中使用的图片"
        type="info"
        showIcon
      />
      <div className="flex justify-center">
        <Button
          className="mt-4"
          type="primary"
          loading={connect && (info == null || info?.code == 2)}
          disabled={!connect || deleteCode == 2}
          onClick={start}
        >
          {info ? info.message : "获取状态中"}
        </Button>
      </div>
      <div className="mt-5">
        <Card title="实时进度" bordered={true}>
          <div className="h-96 overflow-y-scroll scrollbar-corner-black">
            {messageList.map((item, index) => (
              <div
                key={item + index + Math.random()}
                className={classNames("mt-1", !index && "font-bold mt-0 text-lg")}
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
        {list && (
          <>
            <Alert
              className="mt-5"
              message={
                <div>
                  <span>数据获取时间:</span>
                  <b className="mx-1">{dayjs(time!).format("MM-DD hh:mm:ss")}</b>
                  <span>数据有效时间一天</span>
                  <span className="mx-1">剩余时间：</span>
                  <b>{countdown}</b>
                </div>
              }
              type="warning"
              showIcon
            />
            <div className="mt-3">
              <Table
                pagination={false}
                rowKey="id"
                dataSource={list}
                columns={[
                  {
                    title: "文件夹",
                    dataIndex: "name",
                  },
                  {
                    title: "OSS内文件数(30天前上传)",
                    dataIndex: "oss_count",
                  },
                  {
                    title: "数据库内使用图片数量",
                    dataIndex: "database_count",
                  },
                  {
                    title: "需要删除的图片数量",
                    dataIndex: "delete_count",
                  },
                ]}
              />
              <div className="flex justify-center mt-4">
                <Button
                  loading={deleteCode == 2}
                  icon={<DeleteOutlined />}
                  type="primary"
                  onClick={remove}
                  disabled={!list.some(item => item.delete_count) || !connect}
                >
                  {deleteCode == 0
                    ? "删除失败"
                    : deleteCode == 1
                    ? "删除成功"
                    : deleteCode == 2
                    ? "删除中"
                    : "删除"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};
export default OSS;
