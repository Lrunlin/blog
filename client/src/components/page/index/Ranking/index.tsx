"use client";

import { useState } from "react";
import { Tabs } from "antd";
import AuthorRanking from "./AuthorRanking";
import FunsRanking from "./FunsRanking";

const Ranking = () => {
  let [key, setKey] = useState("0");
  return (
    <div className="mb-4 bg-white">
      <Tabs
        activeKey={key}
        defaultActiveKey="0"
        centered={true}
        onChange={(activeKey) => setKey(activeKey)}
        items={[
          {
            label: "作者榜",
            children: <AuthorRanking />,
          },
          {
            label: "粉丝榜",
            children: <FunsRanking />,
          },
        ].map((item, index) => ({
          label: (
            <div className="px-2">
              {String(index) == key && "🎖️"} {item.label}
            </div>
          ),
          key: String(index),
          children: item.children,
        }))}
      />
    </div>
  );
};
export default Ranking;
