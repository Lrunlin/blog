import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { Button, MenuProps } from "antd";
import { Dropdown } from "antd";
import getTypeTree, { responseType as typeTreeRsponseType } from "@/request/type-tree";

interface propsType {
  onChange: (tagId: string) => any;
}

function Down() {
  const { data, error, isValidating } = useSWR("/type-tree", () => getTypeTree());
  return (
    <div className="w-96 p-3 bg-white shadow-xl rounded-md">
      {isValidating ? (
        <div className="w-full h-full bg-gray-300"></div>
      ) : data ? (
        data.map(item => (
          <div key={item.id}>
            <div></div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">数据获取失败</div>
      )}
    </div>
  );
}

const Tag = () => {
  return (
    <div className="mt-4">
      <Dropdown dropdownRender={() => <Down />}>
        <Button type="primary">添加标签</Button>
      </Dropdown>
    </div>
  );
};
export default Tag;
