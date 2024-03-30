import { memo } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button, Empty, Skeleton, Popconfirm, message } from "antd";
import { response } from "@type/response";
import { TagAttributes } from "@type/type";
import AdminLayout from "@/layout/Admin/Base";
import useFetch from "@/common/hooks/useFetch";
import TagForm from "@/components/admin/page/type/TagForm";

export interface ResponseType extends TagAttributes {
  icon_url: string;
}

const UpdateTag = () => {
  let router = useRouter();
  let params = useParams();
  let id = params.id as string;

  let { data, error } = useFetch(() => {
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
    { manual: true }
  );

  const onFinish = (values: any) => {
    axios
      .put(`/tag/${id}`, values)
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
      <>
        {data ? (
          <>
            <div className="piece mb-4 flex justify-end">
              <Popconfirm
                placement="top"
                title={`是否删除类型: ${data?.name}`}
                onConfirm={remove}
                okText="确认删除"
                cancelText="取消"
              >
                <Button type="primary" danger className="w-32 " loading={isLoading}>
                  删除
                </Button>
              </Popconfirm>
            </div>
            <div className="piece">
              <TagForm onFinish={onFinish} initialValue={data} />
            </div>
          </>
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
      </>
    </AdminLayout>
  );
};
export default memo(UpdateTag);
