import { memo, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import useSwr from "swr";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Empty,
  Skeleton,
  InputNumber,
  Popconfirm,
  message,
  Select,
} from "antd";
import Upload from "@/components/common/UpLoad";
import { response } from "@type/response";
import { TypeAttributesList, TagAttributes } from "@type/type";
import AdminLayout from "@/layout/Admin/Base";
import useFetch from "@/common/hooks/useFetch";

interface ResponseType extends TagAttributes {
  icon_url: string;
}

const UpdateTag = () => {
  let router = useRouter();
  let params = useParams();
  let id = params.id as string;
  let { useForm } = Form;
  let [form] = useForm();

  let { data, error } = useSwr(`/tag/${id}`, () => {
    return axios.get<response<ResponseType>>(`/tag/${id}`).then(res => {
      return res.data.data;
    });
  });

  let { isLoading, refetch: remove } = useFetch(
    () =>
      axios
        .delete(`/tag/${id}`)
        .then(res => {
          message.success(res.data.message);
          router.back();
        })
        .catch(err => {
          message.error(err.message);
        }),
    true
  );

  const onFinish = (values: any) => {
    axios.put(`/tag/${id}`, values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    });
  };

  /** 设置初始化的值*/
  let uploadInitVlaue = useMemo(() => {
    return data?.icon_file_name
      ? {
          file_name: data.icon_file_name,
          icon_url: data.icon_url,
        }
      : undefined;
  }, [data]);
  let { data: typeList } = useSwr(`/type/notTree`, () => {
    return axios.get<response<TypeAttributesList[]>>(`/type`, {}).then(res => {
      return res.data.data;
    });
  });
  const { Option } = Select;

  return (
    <AdminLayout>
      {data ? (
        <Form
          form={form}
          key={data?.id}
          initialValues={data}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
          <Form.Item label="名称" name="icon_file_name">
            <div>
              <Upload
                width={120}
                target="type"
                imgURL={uploadInitVlaue?.icon_url}
                onSuccess={({ file_name }) => {
                  form.setFieldsValue({ icon_file_name: file_name });
                }}
              />
            </div>
          </Form.Item>
          <Form.Item label="名称" name="name" rules={[{ required: true, message: "请填写名称" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="所属" name="belong" rules={[{ required: true, message: "请选择所属" }]}>
            {typeList && (
              <Select style={{ width: 180 }}>
                {typeList.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="索引"
            name="indexes"
            rules={[{ required: true, message: "填写索引值" }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" htmlType="submit" className="w-32">
              修改
            </Button>
            <Popconfirm
              placement="top"
              title={`是否删除类型: ${data?.name}`}
              onConfirm={remove}
              okText="确认删除"
              cancelText="取消"
            >
              <Button type="primary" danger className="w-32 ml-24" loading={isLoading}>
                删除
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      ) : error ? (
        <div className="text-center">
          <Empty description="没有找到对应的类型" />
          <Button type="primary" onClick={() => router.back()} className="mt-12">
            返回
          </Button>
        </div>
      ) : (
        <Skeleton />
      )}
    </AdminLayout>
  );
};
export default memo(UpdateTag);
