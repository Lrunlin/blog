import { useMemo } from "react";
import Editor from "@/components/common/Editor";
import { Button, Form, Input, message, TreeSelect, Skeleton, Result, InputNumber } from "antd";
import axios from "axios";
import Upload from "@/components/common/UpLoad";
import useSwr, { useSWRConfig } from "swr";
import getType from "@/request/getType";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/layout/Admin/Base";
import useFetch from "@/common/hooks/useFetch";

const Update = () => {
  let { useForm } = Form;
  let [form] = useForm();
  let router = useRouter();
  let params = useParams();
  let id = params.id as string;
  let { mutate } = useSWRConfig();

  /** 加载，获取文章内容*/
  let {
    data: response,
    error,
    isValidating,
  } = useSwr(`/article/${id}`, () => axios.get(`/article/${id}?update=md`), {
    revalidateOnMount: true,
  });

  /** 更新文章，提交*/
  let { isLoading, refetch: onFinish } = useFetch(
    (values: any) =>
      axios
        .put(`/article/${id}`, { ...values, state: 1 })
        .then(res => {
          message.success(res.data.message);
          mutate(`/article/${id}`);
        })
        .catch(err => {
          message.error(err.message);
        }),
    true
  );

  //获取typeTree
  let { data: treeData } = useSwr("/type/tree", () =>
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
    <AdminLayout>
      {isValidating && <Skeleton avatar paragraph={{ rows: 4 }} />}
      {error && (
        <Result
          status={(response?.status as any) || 404}
          title="没有找到对应的文章"
          extra={
            <Button type="primary" onClick={() => router.back()}>
              返回上级
            </Button>
          }
        />
      )}
      {response && (
        <Form
          form={form}
          initialValues={response.data.data}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          validateTrigger="onSubmit"
          scrollToFirstError={{ behavior: "smooth", block: "center" }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              { required: true, message: "请填写标题" },
              { type: "string", min: 3, max: 200, message: "标题长度在3-200之间" },
            ]}
          >
            <Input placeholder="填写网站标题" maxLength={200} />
          </Form.Item>
          <Form.Item name="theme_id" hidden rules={[{ required: true }]}>
            <></>
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
            <div>
              <Upload
                onSuccess={({ file_name }) => {
                  form.setFieldsValue({ cover_file_name: file_name });
                }}
                target="cover"
                width={200}
                imgURL={uploadInitVlaue?.icon_url}
                aspect={3 / 2}
              />
            </div>
          </Form.Item>

          <Form.Item label="是否为转载" name="reprint">
            <Input placeholder="转载地址(原创文章则留空)" />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "内容不得为空" }]}
          >
            <div>
              <Editor
                theme={true}
                target="article"
                initValue={response?.data.data.content}
                onChange={html => {
                  form.setFieldsValue({ content: html });
                }}
                onSetTheme={id => {
                  form.setFieldsValue({ theme_id: id });
                }}
                defaultTheme={response?.data.data.theme_id}
              />
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              更新
            </Button>
          </Form.Item>
        </Form>
      )}
    </AdminLayout>
  );
};
export default Update;
