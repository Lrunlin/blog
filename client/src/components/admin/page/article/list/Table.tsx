import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Table, Popover, Avatar, Modal, Button, Tooltip, message, DatePicker } from "antd";
import Link from "next/link";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import { articleListDataContext } from "@/pages/admin/article/list/index";
import classNames from "classnames";
import dayjs from "dayjs";

export const tableOptionContext = atom({
  key: "table-option",
  default: {
    key: 0, //用于刷新表格
    page:
      typeof window !== "undefined" && !isNaN(+window?.sessionStorage.page)
        ? +window?.sessionStorage.page
        : 1,
    page_size:
      typeof window !== "undefined" && !isNaN(+window?.sessionStorage.page_size)
        ? +window?.sessionStorage.page_size
        : 10,
  },
});

const TableCom = () => {
  /** 文章列表数据 */
  let articleList = useRecoilValue(articleListDataContext);
  /** table的选择*/
  let [tableOption, setTableOption] = useRecoilState(tableOptionContext);

  const { confirm } = Modal;
  const destroyAll = () => {
    Modal.destroyAll();
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      render: (text: any, item: any) => {
        return (
          <Popover content={text} trigger="hover">
            <div className="whitespace-nowrap text-ellipsis overflow-hidden w-60">
              <a target="_blank" href={`/article/${item.id}`}>
                {text}
              </a>
            </div>
          </Popover>
        );
      },
      width: 280,
    },
    {
      title: "发表者",
      dataIndex: "author_data",
      render: (author_data: any) => {
        return (
          <Link href={`/user/${author_data.id}`}>
            <Avatar src={author_data.avatar_url} style={{ verticalAlign: "middle" }} size="large">
              {author_data.name.substring(0, 1).toLocaleUpperCase()}
            </Avatar>
          </Link>
        );
      },
      width: 100,
    },
    {
      title: "阅读量",
      dataIndex: "view_count",
      render: (view_count: any) => {
        return (
          <>
            <Tooltip title={view_count}>
              {view_count < 1000
                ? view_count
                : view_count > 1000000
                ? `${Math.ceil(view_count / 1000000)}M`
                : `${Math.ceil(view_count / 1000)}K`}
            </Tooltip>
          </>
        );
      },
      width: 100,
    },
    {
      title: "标签",
      dataIndex: "tag",
      render: (tags: any, record: any, index: any) => {
        return (
          <div className="flex flex-wrap">
            {tags.map((item: any, index: number) => {
              return (
                <div
                  className={classNames([
                    "flex items-center bg-[#55acee] px-1.5 py-0.5 rounded-sm mb-2",
                    index && "ml-1",
                  ])}
                  key={item.id}
                >
                  {item?.icon_url && (
                    <img className="w-4 h-4 mr-1" src={item.icon_url} alt={item.name} />
                  )}
                  <span className="text-sm">{item.name}</span>
                </div>
              );
            })}
          </div>
        );
      },
      width: "20%",
    },
    {
      title: "简介",
      dataIndex: "description",
      className: "break-all",
      render: (text: any) => {
        return (
          <Popover content={text} trigger="hover" overlayClassName="w-3/12 max-w-[300px] break-all">
            <div className="line-clamp-3">{text}</div>
          </Popover>
        );
      },
      width: 200,
    },
    {
      title: "发布时间",
      dataIndex: "create_time",
      render: (create_time: any) => {
        return <DatePicker defaultValue={dayjs(create_time)} showTime />;
      },
      width: 200,
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (id: any, item: any) => {
        return (
          <div className="flex justify-between">
            <Link href={`/admin/article/${id}`}>
              <Button type="primary">编辑</Button>
            </Link>
            <Button
              type="primary"
              danger
              onClick={() => {
                confirm({
                  icon: <ExclamationCircleOutlined />,
                  maskClosable: true,
                  content: (
                    <div className="break-all">
                      确定删除作者:<b>{item.author_data.name}</b>的文章:<b>{item.title}</b>
                    </div>
                  ),
                  onOk() {
                    axios.delete(`/article/${id}`).then(res => {
                      if (res.data.success) {
                        message.success(res.data.message);
                        setTableOption(option => ({ ...option, key: +new Date() }));
                      } else {
                        message.error(res.data.message);
                      }
                    });
                  },
                  onCancel() {
                    destroyAll();
                  },
                });
              }}
            >
              删除
            </Button>
          </div>
        );
      },
      width: 200,
    },
  ];
  return (
    <>
      <Table
        className="mt-4"
        rowKey="id"
        dataSource={articleList.list}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          total: articleList.total_count,
          current: tableOption.page,
          pageSize: tableOption.page_size,
          onChange: (page, pageSize) => {
            window.sessionStorage.page = page;
            window.sessionStorage.page_size = pageSize;
            setTableOption({ page: page, page_size: pageSize, key: 0 });
          },
          showSizeChanger: true,
          showQuickJumper: true,
          // hideOnSinglePage: true, //不要随便开，如果page_size调大了分页隐藏 调不回来
        }}
      />
    </>
  );
};
export default TableCom;
