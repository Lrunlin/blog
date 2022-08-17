import { useNavigate, useParams } from "react-router";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Button, InputNumber, Form, Input, Select, Result, message } from "antd";
import Upload from "@/components/UpLoad";

let { Item } = Form;
const { Option } = Select;

const APP = () => {
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;
  let { data, error, mutate } = useSWR(`/advertisement/${id}`, () =>
    axios.get(`/advertisement/${id}`).then(res => res.data.data)
  );
  let { cache } = useSWRConfig();
  function onFinish(values: any) {
    let { poster_file_name, url, indexes, position } = values;
    axios.put(`/advertisement/${id}`, { poster_file_name, url, indexes, position }).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        mutate();
        cache.delete("/advertisement/list");
      } else {
        message.error(res.data.message);
      }
    });
  }
  function remove() {
    axios.delete(`/advertisement/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        cache.delete("/advertisement/list");
        cache.delete(`/advertisement/${id}`);
        navigate("/advertisement/list");
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <>
      {error && <Result status="error" title="没找到对应的推广内容" />}
      {data && (
        <Form
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
            <Upload
              target="advertisement"
              notCrop={true}
              InitValue={{ file_name: data.poster_file_name, icon_url: data.poster_url }}
            />
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
              <Option value="all">全部</Option>
              <Option value="index">首页</Option>
              <Option value="article">文章页面</Option>
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
    </>
  );
};
export default APP;
