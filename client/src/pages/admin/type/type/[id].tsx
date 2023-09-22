import { memo, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import useSwr from "swr";
import axios from "axios";
import { Form, Input, Button, Empty, Skeleton, InputNumber, Popconfirm, message } from "antd";
import Upload from "@/components/common/UpLoad";
import { response } from "@type/response";
import { TypeAttributes } from "@type/type";
import AdminLayout from "@/layout/Admin/Base";

interface ResponseType extends TypeAttributes {
  icon_url: string;
}

const UpdateType = () => {
  let router = useRouter();
  let params = useParams();
  let id = params.id as string;
  let { useForm } = Form;
  let [form] = useForm();

  let { data, error } = useSwr(`/type/${id})}`, () => {
    return axios.get<response<ResponseType>>(`/type/${id}`).then(res => {
      return res.data.data;
    });
  });

  //   如果ID格式不对就返回
  useEffect(() => {
    if (isNaN(+id)) {
      router.back();
    }
  }, []);

  const remove = () => {
    axios.delete(`/type/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        router.back();
      } else {
        message.error(res.data.message);
      }
    });
  };

  const onFinish = (values: any) => {
    console.log(values);

    axios.put(`/type/${id}`, values).then(res => {
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

          <Form.Item
            label="介绍"
            name="description"
            rules={[{ required: true, message: "写介绍" }]}
          >
            <Input.TextArea />
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
              <Button type="primary" danger className="w-32 ml-24">
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
export default memo(UpdateType);
