"use client";

import { useParams } from "next/navigation";
import { Result, Skeleton, message } from "antd";
import axios from "@axios";
import useFetch from "@/common/hooks/useFetch";
import AdvertisementForm from "@/components/admin/page/advertisement/AdvertisementForm";

const Advertisement = () => {
  let params = useParams();
  let id = params.id as string;

  let { data, error, isLoading, refetch } = useFetch(() =>
    axios.get(`/advertisement/${id}`).then((res) => {
      return res.data.data;
    }),
  );

  function onFinish(values: any) {
    let { poster_file_name, url, indexes, position } = values;
    axios
      .put(`/advertisement/${id}`, { poster_file_name, url, indexes, position })
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
          refetch();
        } else {
          message.error(res.data.message);
        }
      });
  }

  return (
    <>
      <div className="piece">
        {isLoading && (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
        {data && (
          <AdvertisementForm
            submitText="更新"
            initialValue={data}
            onSubmit={onFinish}
          />
        )}
        {error && <Result status="error" title="没找到对应的推广内容" />}
      </div>
    </>
  );
};
export default Advertisement;
