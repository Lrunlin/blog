import { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { advertisementType } from "@type/model/advertisement";
import Upload from "@/components/common/UpLoad";

interface propsType {
  initialValue?: advertisementType & { poster_url: string };
  onSubmit: (params: advertisementType) => any;
  submitText?: string;
}

const AdvertisementForm: FC<propsType> = (props) => {
  const positionSelect = [
    {
      position: "index",
      label: "首页",
      crop: undefined,
    },
    {
      position: "article",
      label: "文章页面",
      crop: undefined,
    },
    {
      position: "creator",
      label: "开发者中心",
      crop: 896 / 240,
    },
  ];

  let { Item, useForm, useWatch } = Form;
  const { Option } = Select;

  let [form] = useForm();

  let position = useWatch("position", form);
  let [uploadKey, setUploadKey] = useState("advertisement-upload-key");
  let [posterURL, setPosterURL] = useState<undefined | string>();

  let crop = useMemo(
    () => positionSelect.find((item) => item.position == position)?.crop,
    [position],
  );

  let oldPosition = useRef("index");
  useEffect(() => {
    if (props.initialValue) {
      form.setFieldsValue(props.initialValue);
      setPosterURL(props.initialValue.poster_url);
      oldPosition.current = props.initialValue.position;
    }
  }, [props.initialValue]);
  useEffect(() => {
    if (position) {
      //初始化时候是undefined
      // 如果要求的比例不一样，清除上传的图片
      if (
        positionSelect.find((item) => item.position == position)?.crop !=
        positionSelect.find((item) => item.position == oldPosition.current)
          ?.crop
      ) {
        setUploadKey(`advertisement-upload-${+new Date()}`);
        setPosterURL(undefined);
        form.setFieldsValue({ poster_file_name: null });
      }
      oldPosition.current = position;
    }
  }, [position]);

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
        onFinish={props.onSubmit}
        autoComplete="off"
        initialValues={
          props.initialValue || {
            poster_file_name: "",
            indexes: 1,
            url: null,
            position: "index",
          }
        }
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
              noCorp={!crop}
              key={uploadKey}
              imgURL={posterURL}
              width={Math.min(200 * (crop || 1), 300)}
              aspect={crop}
              target="advertisement"
              onSuccess={({ file_href, file_name }) => {
                setPosterURL(file_href);
                form.setFieldsValue({ poster_file_name: file_name });
              }}
              onDelete={() => {
                setPosterURL(undefined);
                form.setFieldsValue({ poster_file_name: null });
              }}
            />
          </div>
        </Item>
        <Item
          label="链接"
          name="url"
          rules={[
            {
              pattern: /^https:\/\/.{3,98}$/,
              message: "链接地址为长度100以内的https URL",
            },
          ]}
        >
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
            {positionSelect.map((item) => (
              <Option value={item.position} key={item.position + item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Item>
        <Item wrapperCol={{ offset: 2, span: 10 }}>
          <Button type="primary" htmlType="submit">
            {props.submitText || "发布"}
          </Button>
        </Item>
      </Form>
    </>
  );
};
export default AdvertisementForm;
