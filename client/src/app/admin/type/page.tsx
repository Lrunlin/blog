"use client";

import { useRef } from "react";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import { Button, Tree, message } from "antd";
import axios from "@axios";
import useFetch from "@/common/hooks/useFetch";
import AddTagModal, {
  TagFormValueProps,
  event as tagEvent,
} from "@/components/admin/page/type/AddTagModal";
import AddTypeModal, {
  TypeFormValueProps,
  event as typeEvent,
} from "@/components/admin/page/type/AddTypeModal";
import getType from "@/request/type/getTag";

const TypeList = () => {
  let router = useRouter();
  let { data } = useFetch(() => getType("tree"));
  let typeEvent = useRef({} as typeEvent);
  const createType = (values: TypeFormValueProps) => {
    axios.post("/tag", values).then((res) => {
      if (res.data.success) {
        message.success(res.data.message);
        typeEvent.current.onClose();
      } else {
        message.error(res.data.message);
      }
    });
  };
  const createTag = (values: TagFormValueProps) => {
    axios.post("/tag", values).then((res) => {
      if (res.data.success) {
        message.success(res.data.message);
        tagEvent.current.onClose();
      } else {
        message.error(res.data.message);
      }
    });
  };
  let tagEvent = useRef({} as tagEvent);
  return (
    <>
      <div className="piece">
        <Button type="primary" onClick={() => typeEvent.current.onOpen()}>
          添加Type
        </Button>
        <Button
          type="primary"
          className="ml-4"
          onClick={() => tagEvent.current.onOpen()}
        >
          添加Tag
        </Button>
      </div>
      <AddTypeModal onFinish={(values) => createType(values)} ref={typeEvent} />
      <AddTagModal
        key={`用于刷新${data?.length}`}
        onFinish={(values) => createTag(values)}
        ref={tagEvent}
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
                  className="flex h-12 items-center"
                  onClick={() =>
                    router.push(
                      `/admin/type/${node.belong ? "tag" : "type"}/${node.id}`,
                    )
                  }
                >
                  {node.icon_url ? (
                    <img className="h-8 w-8" src={node.icon_url} alt="ICON" />
                  ) : (
                    <div className="h-8 w-8 bg-slate-700 text-center text-white">
                      空
                    </div>
                  )}
                  <span className="ml-4">{node.name}</span>
                </div>
              );
            }}
          />
        </div>
      )}
    </>
  );
};
export default TypeList;
