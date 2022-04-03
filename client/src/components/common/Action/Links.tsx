import { useState, useEffect } from "react";
import { Avatar } from "antd";
import { getLinksData } from "@/request";
import type { linksType } from "@/types";
import css from "styled-jsx/css";
import Skeleton from "./Skeleton";

const Style = css`
  .links-container {
    margin-top: 10px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    .links-link {
      color: black;
      height: 30px;
      display: block;
      span {
        margin-left: 10px;
      }
    }
  }
`;

/**
 * 友链展示组件
 */
export default function Links() {
  const [linksData, setLinksData] = useState<linksType[]|false>(false);
  useEffect(() => {
    getLinksData().then(res => {
      setLinksData(res);
    });
  }, []);
  return (
    <>
      <style jsx>{Style}</style>
      {linksData ? (
        <div className="links-container">
          {linksData.map(item => {
            return (
              <a
                key={item.id}
                target="_blank"
                className="links-link"
                rel={item.drainage ? undefined : "nofollow"}
                title={item.description}
                href={item.url}
              >
                <Avatar src={item.logo} size={20} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
