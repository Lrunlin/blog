import { Button, Card, DatePicker, Form, Input, Select, Switch } from "antd";
import useAdminArticleSearch from "@/store/admin/admin-search-option";

const Header = () => {
  let searchOption = useAdminArticleSearch((s) => s);

  // 更新Store
  function onFinish(values: any) {
    let _option = {
      ...values,
      deadline: values?.deadline?._d || undefined,
    };
    searchOption.setData(_option);
  }

  const { Option } = Select;
  return (
    <Card className="article-list_header">
      <Form
        initialValues={searchOption.data}
        onFinish={onFinish}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item label="文章ID" name="id">
          <Input placeholder="输入文章ID" className="w-40" />
        </Form.Item>

        <Form.Item label="发布者ID" name="author_id">
          <Input placeholder="发布者ID" className="w-40" />
        </Form.Item>

        <Form.List name="sort">
          {(fields) =>
            fields.map((field, index) => (
              <Form.Item {...field} label={index == 0 ? "排序" : ""}>
                <Select
                  value={searchOption.data.sort[index]}
                  style={{ width: "120px" }}
                >
                  {index == 0 ? (
                    <>
                      <Option value="create_time">发布时间</Option>
                      <Option value="update_time">更新时间</Option>
                      <Option value="view_count">阅读数</Option>
                    </>
                  ) : (
                    <>
                      <Option value="desc">降序</Option>
                      <Option value="asc">升序</Option>
                    </>
                  )}
                </Select>
              </Form.Item>
            ))
          }
        </Form.List>

        <Form.Item label="仅原创" name="only_original">
          <Switch></Switch>
        </Form.Item>

        <Form.Item label="截止时间" name="deadline">
          <DatePicker
            showTime
            placeholder="查询指定时间后发布的文章"
            className="w-40"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="ml-4">
            查询
          </Button>
        </Form.Item>
      </Form>
      <style jsx global>
        {`
          .article-list_header .ant-form-item {
            margin: 0px 0px 20px 15px !important;
          }
        `}
      </style>
    </Card>
  );
};
export default Header;
