"use client";

import { memo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Empty, Form, Popconfirm, Skeleton, message } from "antd";
import axios from "@axios";
import { response } from "@type/response";
import { TagAttributes } from "@type/type";
import useFetch from "@/common/hooks/useFetch";
import AdminLayout from "@/layout/Admin/Base";
import TypeForm from "@/components/admin/page/type/TypeForm";

interface ResponseType extends TagAttributes {
  icon_url: string;
}

const UpdateType = () => {
  let router = useRouter();
  let params = useParams();
  let id = params.id as string;
  let { useForm } = Form;
  let [form] = useForm();

  let { data, error } = useFetch(() =>
    axios
      .get<response<ResponseType>>(`/tag/${id}`)
      .then((res) => res.data.data),
  );

  const remove = () => {
    axios.delete(`/tag/${id}`).then((res) => {
      if (res.data.success) {
        message.success(res.data.message);
        router.back();
      } else {
        message.error(res.data.message);
      }
    });
  };

  const onFinish = (values: any) => {
    axios
      .put(`/tag/${id}`, values)
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <AdminLayout>
      <div>
        {data ? (
          <div>
            <div className="piece mb-4 flex justify-end">
              <Popconfirm
                placement="top"
                title={`是否删除类型: ${data?.name}`}
                onConfirm={remove}
                okText="确认删除"
                cancelText="取消"
              >
                <Button type="primary" danger className="ml-24 w-32">
                  删除
                </Button>
              </Popconfirm>
            </div>
            <div className="piece">
              <TypeForm onFinish={onFinish} initialValue={data} />
            </div>
          </div>
        ) : error ? (
          <div className="piece text-center">
            <Empty description="没有找到对应的类型" />
            <Button
              type="primary"
              onClick={() => router.back()}
              className="mt-12"
            >
              返回
            </Button>
          </div>
        ) : (
          <div className="piece">
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
export default memo(UpdateType);
