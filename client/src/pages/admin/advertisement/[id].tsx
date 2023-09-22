import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import axios from "axios";
import { Button, InputNumber, Form, Input, Select, Result, message } from "antd";
import Upload from "@/components/common/UpLoad";
import AdminLayout from "@/layout/Admin/Base";
import { positionSelect } from ".";
import useFetch from "@/common/hooks/useFetch";

const Advertisement = () => {
  let router = useRouter();
  let params = useParams();
  let id = params.id as string;
  let { useForm, Item, useWatch } = Form;
  const { Option } = Select;
  let [form] = useForm();
  let position = useWatch("position", form);

  let crop = useMemo(
    () => positionSelect.find(item => item.position == position)?.crop,
    [position]
  );

  let [posterURL, setPosterURL] = useState<undefined | string>();
  let { data, error, refetch } = useFetch(() =>
    axios.get(`/advertisement/${id}`).then(res => {
      setPosterURL(res.data.data.poster_url);
      return res.data.data;
    })
  );

  function onFinish(values: any) {
    let { poster_file_name, url, indexes, position } = values;
    axios.put(`/advertisement/${id}`, { poster_file_name, url, indexes, position }).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        refetch();
      } else {
        message.error(res.data.message);
      }
    });
  }
  function remove() {
    axios.delete(`/advertisement/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        router.push("/admin/advertisement/list");
      } else {
        message.error(res.data.message);
      }
    });
  }

  return (
    <AdminLayout>
      {error && <Result status="error" title="没找到对应的推广内容" />}
      {data && (
        <Form
          form={form}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 10 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={data}
          validateTrigger="onSubmit"
        >
          <Item
            label="海报"
            name="poster_file_name"
            required
            rules={[
              { required: true, message: "选择海报" },
              { min: 10, message: "最小长度为10" },
            ]}
          >
            <div>
              <Upload
                key={`advertisement-upload-${posterURL}`}
                width={Math.min(200 * crop!, 300)}
                aspect={crop}
                target="advertisement"
                imgURL={posterURL}
                onSuccess={({ file_name, file_href }) => {
                  setPosterURL(file_href);
                  form.setFieldsValue({ poster_file_name: file_name });
                }}
                onDelete={() => {
                  form.setFieldsValue({ poster_file_name: null });
                }}
              />
            </div>
          </Item>
          <Item label="链接" name="url">
            <Input placeholder="活动地址" />
          </Item>
          <Item
            label="索引值"
            name="indexes"
            required
            rules={[
              { required: true, message: "请填写索引值" },
              { type: "number", min: 1, message: "最小为1" },
            ]}
          >
            <InputNumber min={1} />
          </Item>
          <Item label="显示位置" name="position" required>
            <Select
              style={{ width: 120 }}
              onChange={() => {
                // 清除上传的图片
                setPosterURL(undefined);
                form.setFieldsValue({ poster_file_name: null });
              }}
            >
              {positionSelect.map(item => (
                <Option value={item.position} key={item.position + item.label}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Item>
          <Item wrapperCol={{ offset: 2, span: 10 }}>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
            <Button type="primary" danger className="ml-8" onClick={remove}>
              删除
            </Button>
          </Item>
        </Form>
      )}
    </AdminLayout>
  );
};
export default Advertisement;
