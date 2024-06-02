"use client";
import { message } from "antd";
import axios from "@axios";
import { useState } from "react";
import AdminLayout from "@/layout/Admin/Base";
import AdvertisementForm from "@/components/admin/page/advertisement/AdvertisementForm";

const APP = () => {
  const [key, setKey] = useState(`key-AdvertisementForm-1`);

  function onFinish(values: any) {
    axios.post("/advertisement", values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setKey(`key-AdvertisementForm-${Math.random()}`);
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <AdminLayout>
      <div className="piece">
        <AdvertisementForm key={key} onSubmit={onFinish} />
      </div>
    </AdminLayout>
  );
};
export default APP;
