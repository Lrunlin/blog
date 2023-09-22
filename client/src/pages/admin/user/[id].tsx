import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { Skeleton, Button, Result, Descriptions } from "antd";
import AdminLayout from "@/layout/Admin/Base";

const UserData = () => {
  let params = useParams();
  let id = params.id as string;
  let router = useRouter();
  const { data, isValidating } = useSWR(`/user/${id}`, () =>
    axios.get(`/user/data/${id}`).then(res => res.data.data)
  );

  return (
    <AdminLayout>
      <div className="p-2 bg-white shadow-sm">
        {isValidating ? (
          <Skeleton paragraph={{ rows: 3 }} active />
        ) : data ? (
          <div>
            <Descriptions title={`用户ID: ${id}`} bordered size="small" column={4}>
              <Descriptions.Item label="头像">
                <img src={data.avatar_url} alt="头像" className="w-20 h-20" />
              </Descriptions.Item>
              <Descriptions.Item label="用户名">
                <div>{data.name}</div>
              </Descriptions.Item>
              {data.description && (
                <Descriptions.Item label="自我介绍">data.description</Descriptions.Item>
              )}
              {data.github && (
                <Descriptions.Item label="GitHub">
                  <a href={`https://github.com/${data.github}`} target="_blank">
                    {data.github}
                  </a>
                </Descriptions.Item>
              )}
              {data.site && (
                <Descriptions.Item label="个人网站">
                  <a href={data.site} target="_blank">
                    {data.site}
                  </a>
                </Descriptions.Item>
              )}
              {data.unit && <Descriptions.Item label="单位/组织">{data.unit}</Descriptions.Item>}
              {data.location && (
                <Descriptions.Item label="所在地">{data.location}</Descriptions.Item>
              )}
              {data.email && <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>}
              <Descriptions.Item label="文章收藏数量">{data.collection_count}</Descriptions.Item>
              <Descriptions.Item label="关注者数量">{data.followee_count}</Descriptions.Item>
              <Descriptions.Item label="粉丝数量">{data.follower_count}</Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <Result
            status="warning"
            title="请求错误或未找到指定用户"
            extra={
              <Button type="primary" onClick={() => router.back()}>
                返回
              </Button>
            }
          />
        )}
      </div>
    </AdminLayout>
  );
};
export default UserData;
