import { useState, useMemo } from "react";
import { message, Button, Input, Table, Result } from "antd";
import AdminLayout from "@/layout/Admin/Base";
import useFetch from "@/common/hooks/useFetch";
import axios from "axios";
import { response } from "@type/response";

const ExternalLink = () => {
  const [value, setValue] = useState("");
  let {
    data,
    error,
    isLoading: listIsLoading,
    refetch,
    setData,
  } = useFetch(() => axios.get<response<any[]>>("/external-link").then(res => res.data.data));
  let disabled = useMemo(
    () =>
      !/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(value) ||
      !data ||
      data.some(item => item.href == value),
    [value, data]
  );

  let { refetch: submit, isLoading } = useFetch(
    () =>
      axios
        .post("/external-link", { href: value })
        .then(res => {
          message.success("添加成功");
          refetch();
          setValue('');
        })
        .catch(err => {
          message.error(err.message);
          console.log(err);
        }),
    true
  );

  const [removeId, setRemoveId] = useState<null | number>(null);
  let { refetch: remove } = useFetch((id: number) => {
    setRemoveId(id);
    return axios
      .delete(`/external-link/${id}`)
      .then(res => {
        setData(data => data!.filter(item => item.id != id));
      })
      .catch(err => {
        message.error(err.message);
        console.log(err);
      })
      .finally(() => {
        setRemoveId(null);
      });
  }, true);

  return (
    <AdminLayout>
      <div>
        <Input
          placeholder="输入二级域名"
          className="w-80"
          value={value}
          maxLength={150}
          onChange={e => setValue(e.target.value)}
        />
        <Button
          type="primary"
          loading={isLoading}
          disabled={disabled}
          className="ml-3"
          onClick={submit}
        >
          添加
        </Button>
      </div>
      <div className="mt-4">
        {data ? (
          <Table
            dataSource={data}
            pagination={false}
            rowKey="id"
            columns={[
              {
                title: "域名",
                dataIndex: "href",
              },
              {
                title: "添加时间",
                dataIndex: "create_time",
              },
              {
                title: "删除",
                dataIndex: "id",
                render(value) {
                  return (
                    <Button
                      type="primary"
                      danger
                      onClick={() => remove(value)}
                      loading={removeId == value}
                    >
                      删除
                    </Button>
                  );
                },
              },
            ]}
          />
        ) : listIsLoading ? (
          <div className="h-96 w-full bg-gray-200 animate-pulse"></div>
        ) : (
          <Result
            status="error"
            title="数据获取失败"
            extra={
              <Button type="primary" onClick={refetch}>
                重试
              </Button>
            }
          />
        )}
      </div>
    </AdminLayout>
  );
};
export default ExternalLink;
