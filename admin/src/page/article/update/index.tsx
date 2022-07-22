import { useMemo, useEffect } from "react";
import MarkDownEditor from "@/components/MarkDownEditor";
import { Button, Form, Input, message, TreeSelect, Skeleton, Result, InputNumber } from "antd";
import axios from "axios";
import Upload from "@/components/UpLoad";
import useSwr, { useSWRConfig } from "swr";
import getType from "@/request/getType";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const Update = () => {
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;
  let { mutate } = useSWRConfig();

  /** 加载，获取文章内容*/
  let {
    data: response,
    error,
    isValidating,
  } = useSwr(
    [`/article/${id}`],
    () => axios.get(`/article/${id}?update=md`),
    {
      revalidateOnMount: true,
    },
  );

  /** 更新文章，提交*/
  function onFinish(values: any) {
    axios.put(`/article/${id}`, values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        mutate(`/article/${id}`);
      } else {
        message.error(res.data.message);
      }
    });
  }

  //获取typeTree
  let { data: treeData } = useSwr("/type", () =>
    getType().then(res => {
      return res.map(item => ({
        ...item,
        checkable: false,
        children: item.children?.map(_item => ({ ..._item, key: _item.id })),
      }));
    })
  );

  let uploadInitVlaue = useMemo(() => {
    return response?.data.data.cover_file_name
      ? {
          file_name: response.data.data.cover_file_name,
          icon_url: response.data.data.cover_url,
        }
      : undefined;
  }, [response]);

  return (
    <>
      {isValidating && <Skeleton avatar paragraph={{ rows: 4 }} />}
      {error && (
        <Result
          status={(response?.status as any) || 404}
          title="没有找到对应的文章"
          extra={
            <Button type="primary" onClick={() => navigate(-1)}>
              返回上级
            </Button>
          }
        />
      )}
      {response && (
        <Form
          initialValues={response.data.data}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          validateTrigger="onSubmit"
          scrollToFirstError={{ behavior: "smooth", block: "center" }}
        >
          <Form.Item label="标题" name="title" rules={[{ required: true, message: "请填写标题" }]}>
            <Input placeholder="填写网站标题" maxLength={50} />
          </Form.Item>

          <Form.Item
            label="标签"
            name="tag"
            rules={[
              { required: true, message: "请选择文章标签" },
              { type: "array", max: 6, message: "标签数量在1-6个" },
            ]}
          >
            {treeData && (
              <TreeSelect
                treeData={treeData}
                treeCheckable={true}
                treeDefaultExpandAll
                placeholder="选择文章对应的标签"
                fieldNames={{ label: "name", value: "id" }}
              />
            )}
          </Form.Item>

          <Form.Item
            label="介绍"
            name="description"
            rules={[{ max: 200, message: "最大不得超过200个字符" }]}
          >
            <Input.TextArea rows={5} placeholder="填写介绍" maxLength={200} showCount />
          </Form.Item>

          <Form.Item
            label="阅读量"
            name="view_count"
            rules={[
              { required: true, message: "请填写文章阅读量" },
              { type: "number", min: 0, message: "阅读量不得为负数" },
            ]}
          >
            <InputNumber className="w-44" min={0} />
          </Form.Item>

          <Form.Item label="封面" name="cover_file_name">
            <Upload target="cover" InitValue={uploadInitVlaue} aspect={3 / 2} />
          </Form.Item>

          <Form.Item label="是否为转载" name="reprint">
            <Input placeholder="转载地址(原创文章则留空)" />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "内容不得为空" }]}
          >
            <MarkDownEditor />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" htmlType="submit">
              更新
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default Update;
