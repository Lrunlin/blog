import { Fragment, useState, useMemo } from "react";
import Link from "next/link";
import { FieldTimeOutlined, FileTextOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import style from "./index.module.scss";
/*
 @params data{object[]}:渲染的数据
 @params className:article{string}标签额外添加的类
*/

export default function Article({
  data,
  className,
}: {
  data: any[];
  className?: string;
}) {

  return (
    <Fragment>
      {data.map((item, index) => {
        return (
          // 动态接收一个className，参数为可选参数
          <article
            key={item.router}
            className={style.article + ` ${className || ""}`}
          >
            <h1 className={style.title}>
              <Link href={`/article/${item.router}`}>
                <a>{item.title}</a>
              </Link>
            </h1>
            <div className="types pc">
              {item.type.split(",").map((item: string, index) => {
                return (
                  <Link href={`/search/${item}`} key={item}>
                    <a>
                      <Tag color="blue">{item}</Tag>
                    </a>
                  </Link>
                );
              })}
            </div>
            <time>
              <FieldTimeOutlined />
              {item.time.substring(0, 10)}
            </time>
            <div className={style.introduce}>
              {item.introduce}
            </div>
            <div className={style.article_footer}>
              <div className={style.article_link}>
                <FileTextOutlined />
                <Link href={`/article/${item.router}`}>
                  <a>查看文章&gt;</a>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </Fragment>
  );
}
