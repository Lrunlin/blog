import { Button, InputNumber, Form, Input, Select, message } from "antd";
import axios from "axios";
import Upload from "@/components/common/UpLoad";
import { useMemo, useState } from "react";
import AdminLayout from "@/layout/Admin/Base";
import AdvertisementForm from "@/components/admin/page/advertisement/AdvertisementForm";

export const positionSelect = [
  {
    position: "index",
    label: "首页",
    // crop: 3 / 2,
  },
  {
    position: "article",
    label: "文章页面",
    // crop: 3 / 2,
  },
  {
    position: "creator",
    label: "开发者中心",
    crop: 896 / 240,
  },
];

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
