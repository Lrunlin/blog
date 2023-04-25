import useSWR from "swr";
import axios from "axios";
import { Skeleton, Result, Table, Image, Button } from "antd";
import { useNavigate } from "react-router";
import moment from "moment";
let positionMapping = {
  index: "首页",
  article: "文章页面",
  creator: "创作者中心",
};
function Position(position: keyof typeof positionMapping) {
  return positionMapping[position];
}
const APP = () => {
  let { data, error, isValidating } = useSWR("/advertisement/list", () =>
    axios.get("/advertisement").then(res => res.data.data)
  );
  let navigate = useNavigate();
  const columns = [
    {
      title: "海报",
      dataIndex: "poster_url",
      render(url: string) {
        return <Image width={150} src={url} alt="海报" />;
      },
      width: 200,
    },
    {
      title: "链接地址",
      dataIndex: "url",
      render(url: string | null) {
        return url ? (
          <div className="w-60 truncate">
            <a href={url} target="_blank">
              {url}
            </a>
          </div>
        ) : (
          "无链接"
        );
      },
      width: 200,
    },
    {
      title: "显示位置",
      dataIndex: "position",
      render(position: string) {
        return <div>{Position(position as any)}</div>;
      },
      width: 200,
    },
    {
      title: "发布时间",
      dataIndex: "create_time",
      render(time: string) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "编辑",
      dataIndex: "id",
      render(id: string) {
        return (
          <Button onClick={() => navigate(`/advertisement/${id}`)} size="small" type="primary">
            编辑
          </Button>
        );
      },
    },
  ];
  return (
    <>
      {data && (
        <div className="piece">
          <Table
            dataSource={data}
            rowKey="id"
            columns={columns}
            pagination={{
              position: ["bottomCenter"],
            }}
          />
        </div>
      )}
      {error && <Result status="error" title="请求错误"></Result>}
      {isValidating && (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
    </>
  );
};
export default APP;
