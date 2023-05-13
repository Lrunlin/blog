import { useRef } from "react";
import axios from "axios";
import { Button, message, Tree } from "antd";
import useSwr, { useSWRConfig } from "swr";
import getType from "@/request/getType";
import AddTypeModal, {
  event as typeEvent,
  TypeFormValueProps,
} from "@/components/admin/page/type/AddTypeModal";
import AddTagModal, {
  event as tagEvent,
  TagFormValueProps,
} from "@/components/admin/page/type/AddTagModal";
import { useRouter } from "next/navigation";
import AdminLayout from "@/layout/Admin/Base";
const TypeList = () => {
  let router = useRouter();
  const { mutate } = useSWRConfig();
  let { data } = useSwr("/type/tree", () => getType());
  let typeEvent = useRef({} as typeEvent);
  const createType = (values: TypeFormValueProps) => {
    axios.post("/type", values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        typeEvent.current.onClose();
        mutate("/type/tree");
      } else {
        message.error(res.data.message);
      }
    });
  };
  const createTag = (values: TagFormValueProps) => {
    axios.post("/tag", values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        mutate("/type/tree");
        tagEvent.current.onClose();
      } else {
        message.error(res.data.message);
      }
    });
  };
  let tagEvent = useRef({} as tagEvent);
  return (
    <AdminLayout>
      <div className="piece">
        <Button type="primary" onClick={() => typeEvent.current.onOpen()}>
          添加Type
        </Button>
        <Button type="primary" className="ml-4" onClick={() => tagEvent.current.onOpen()}>
          添加Tag
        </Button>
      </div>
      <AddTypeModal onFinish={values => createType(values)} event={typeEvent} />
      <AddTagModal
        key={`用于刷新${data?.length}`}
        onFinish={values => createTag(values)}
        event={tagEvent}
      />
      {data && (
        <div className="piece mt-4">
          <Tree
            showIcon={true}
            blockNode
            className="mt-8"
            fieldNames={{ title: "name", key: "id" }}
            treeData={data as any}
            titleRender={(node: any) => {
              return (
                <div
                  className="h-12 flex items-center"
                  onClick={() =>
                    router.push(`/admin/type/${node.belong ? "tag" : "type"}/${node.id}`)
                  }
                >
                  {node.icon_url ? (
                    <img className="h-8 w-8" src={node.icon_url} alt="ICON" />
                  ) : (
                    <div className="h-8 w-8 bg-slate-700 text-white text-center">空</div>
                  )}
                  <span className="ml-4">{node.name}</span>
                </div>
              );
            }}
          />
        </div>
      )}
    </AdminLayout>
  );
};
export default TypeList;
