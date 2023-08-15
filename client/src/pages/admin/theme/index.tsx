import useFetch from "@/common/hooks/useFetch";
import axios from "axios";
import { Table, Button, message, Modal, Skeleton, Result, Tag, Popconfirm } from "antd";
import { useState } from "react";
import { Select } from "antd";
import AdminLayout from "@/layout/Admin/Base";
import CodeEdite from "@/components/admin/page/theme/CodeEdite";
import { CheckCircleOutlined, FieldTimeOutlined } from "@ant-design/icons";

const List = () => {
  const [previewID, setPreviewID] = useState<null | number>(null);
  const [content, setContent] = useState<string>("");

  let { data, isLoading, error, setData, refetch } = useFetch(() =>
    axios.get("/theme", { params: { all: true } }).then(res => res.data.data)
  );

  let { isLoading: removeIsLoading, refetch: remove } = useFetch(
    (id: number) =>
      axios
        .delete(`/theme/${id}`)
        .then(res => {
          message.success(res.data.message);
          setData((_data: any[]) => _data.filter(item => item.id != id));
        })
        .catch(err => {
          message.error(err.message);
        }),
    true
  );

  function updateIndex(id: number, value: number) {
    axios.put(`/theme/${id}`, { indexes: value }).catch(err => {
      message.error(err.message);
    });
  }

  let { isLoading: itemIsLoading, refetch: itemFetch } = useFetch(
    (id: number) =>
      axios
        .get(`/theme/${id}`)
        .then(res => {
          setContent(res.data.data.content);
          setPreviewID(id);
        })
        .catch(err => {
          console.log(err);
          message.error(err.message);
          return err;
        }),
    true
  );

  let { isLoading: uptateContentIsLoading, refetch: updateContent } = useFetch(
    () =>
      axios
        .put(`/theme/${previewID}`, { content: content })
        .then(res => {
          message.success(res.data.message);
        })
        .catch(err => {
          message.error(err.message);
        }),
    true
  );

  let { refetch: allow } = useFetch(
    (id: number) =>
      axios
        .put(`/theme/${id}`, { state: 1 })
        .then(res => {
          message.success(res.data.message);
          setData((_data: any[]) =>
            _data.map(item => (item.id == id ? { ...item, state: 1 } : item))
          );
        })
        .catch(err => {
          message.error(err.message);
        }),
    true
  );

  return (
    <AdminLayout>
      <Modal
        className="!w-[880px] !max-w-[80vw]"
        title="代码编辑"
        open={previewID != null}
        destroyOnClose={true}
        onCancel={() => setPreviewID(null)}
        footer={
          <>
            <Button onClick={() => setPreviewID(null)}>取消</Button>
            <Button onClick={updateContent} type="primary" loading={uptateContentIsLoading}>
              确定修改
            </Button>
          </>
        }
      >
        <CodeEdite defaultValue={content} onChange={val => setContent(val)} />
      </Modal>
      <div>
        {data ? (
          <Table
            rowKey="id"
            pagination={false}
            dataSource={data}
            columns={[
              {
                title: "状态",
                dataIndex: "state",
                width: 100,
                render: (state, option) =>
                  state ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      使用中
                    </Tag>
                  ) : (
                    <Popconfirm
                      title="是否同意该主题使用？"
                      onConfirm={() => allow(option.id)}
                      onCancel={() => remove(option.id)}
                      okText="通过"
                      cancelText="删除主题"
                    >
                      <Tag icon={<FieldTimeOutlined />} color="warning">
                        等待审批
                      </Tag>
                    </Popconfirm>
                  ),
              },
              {
                title: "主题名称",
                dataIndex: "name",
              },
              {
                title: "排序",
                dataIndex: "indexes",
                render: (indexes, option) => {
                  return (
                    <Select
                      defaultValue={indexes}
                      style={{ width: 120 }}
                      onChange={val => updateIndex(option.id, val)}
                      options={new Array(data.length).fill(null).map((item, index) => ({
                        value: index + 1,
                        label: index + 1,
                      }))}
                    />
                  );
                },
              },
              {
                title: "预览",
                dataIndex: "id",
                width: 180,
                render: (id, option) => (
                  <Button type="primary" onClick={() => itemFetch(id)}>
                    预览
                  </Button>
                ),
              },
              {
                title: "删除",
                dataIndex: "id",
                width: 180,
                render: id => (
                  <Button
                    type="primary"
                    loading={removeIsLoading}
                    danger
                    onClick={() => remove(id)}
                  >
                    删除
                  </Button>
                ),
              },
            ]}
          />
        ) : isLoading ? (
          <Skeleton active paragraph={{ rows: 10 }} />
        ) : (
          <Result
            status="error"
            title="数据获取错误"
            extra={
              <Button type="primary" onClick={refetch} loading={isLoading}>
                重新获取
              </Button>
            }
          ></Result>
        )}
      </div>
    </AdminLayout>
  );
};
export default List;
