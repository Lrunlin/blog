import { useState, memo, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import Upload from "@/components/UpLoad";
import { response } from "@type/response";
import { TypeAttributesList, TagAttributes } from "@type/type";

interface ResponseType extends TagAttributes {
  icon_url: string;
}

const UpdateTag = () => {
  let navigate = useNavigate();
  let params = useParams<{ id: string }>();

  let { data, error } = useSwr(`/tag/${params.id}`, () => {
    return axios.get<response<ResponseType>>(`/tag/${params.id}`).then(res => {
      return res.data.data;
    });
  });

  //   如果ID格式不对返回
  useEffect(() => {
    if (isNaN(+(params as any).id)) {
      navigate(-1);
    }
  }, []);

  const remove = () => {
    axios.delete(`/tag/${params.id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        navigate(-1);
      } else {
        message.error(res.data.message);
      }
    });
  };

  const onFinish = (values: any) => {
    axios.put(`/tag/${params.id}`, values).then(res => {
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
    <>
      {data ? (
        <Form
          key={data?.id}
          initialValues={data}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          scrollToFirstError={true}
          onFinish={onFinish}
        >
          <Form.Item label="名称" name="icon_file_name">
            <Upload target="type" InitValue={uploadInitVlaue} />
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
              <Button type="primary" danger className="w-32 ml-24">
                删除
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      ) : error ? (
        <div className="text-center">
          <Empty description="没有找到对应的类型" />
          <Button type="primary" onClick={() => navigate(-1)} className="mt-12">
            返回
          </Button>
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
};
export default memo(UpdateTag);
