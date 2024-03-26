import { memo, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import useSwr from "swr";
import axios from "axios";
import { Form, Input, Button, Empty, Skeleton, InputNumber, Popconfirm, message } from "antd";
import Upload from "@/components/common/UpLoad";
import { response } from "@type/response";
import { TypeAttributes } from "@type/type";
import AdminLayout from "@/layout/Admin/Base";
import TypeForm from "@/components/admin/page/type/TypeForm";

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
    axios
      .put(`/type/${id}`, values)
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
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
                <Button type="primary" danger className="w-32 ml-24">
                  删除
                </Button>
              </Popconfirm>
            </div>
            <div className="piece">
              <TypeForm onFinish={onFinish} initialValue={data} />
            </div>
          </div>
        ) : error ? (
          <div className="text-center piece">
            <Empty description="没有找到对应的类型" />
            <Button type="primary" onClick={() => router.back()} className="mt-12">
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
