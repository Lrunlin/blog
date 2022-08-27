import { Button, InputNumber, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useSWRConfig } from "swr";
import Upload from "@/components/UpLoad";
import { useMemo } from "react";

const positionSelect = [
  {
    position: "index",
    label: "首页",
  },
  {
    position: "article",
    label: "文章页面",
  },
  {
    position: "creator",
    label: "开发者中心",
    crop: 896 / 240,
  },
];

let { Item, useForm, useWatch } = Form;
const { Option } = Select;
const APP = () => {
  let [form] = useForm();
  let { cache } = useSWRConfig();
  let position = useWatch("position", form);
  let crop = useMemo(() => positionSelect.find(item => item.position == position)?.crop, [position]);

  function onFinish(values: any) {
    axios.post("/advertisement", values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        form.resetFields();
        cache.delete("/advertisement/list");
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ poster_file_name: "", indexes: 1, url: null, position: "index" }}
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
          <Upload target="advertisement" notCrop={!crop} aspect={crop} />
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
          <Select style={{ width: 120 }}>
            {positionSelect.map(item => (
              <Option value={item.position} key={item.position+item.label}>{item.label}</Option>
            ))}
          </Select>
        </Item>
        <Item wrapperCol={{ offset: 2, span: 10 }}>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Item>
      </Form>
    </>
  );
};
export default APP;
