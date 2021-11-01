import { useState, useEffect, Fragment, useCallback, memo } from "react";
import Link from "next/link";
import { Carousel, Tooltip, Pagination } from "antd";
import axios from "axios";
import Image from "next/image";

import style from "./index.module.scss";

interface XueXiType {
  editor: string[] | string;
  publishTime: string;
  title: string;
  url: string;
  itemId: string;
  channelNames: string[];
  introduce: string;
}
interface response {
  success: boolean;
  total: number;
  data: XueXiType[];
}
interface videoDataTypes {
  url: string;
  videoData: string;
  thumbImage: string;
  auditTime: string[];
  title: string;
}

function theCommunistParty() {
  const [data, setData] = useState<XueXiType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [videoData, setVideoData] = useState<videoDataTypes[]>([]);

  // const getData = useCallback(() => {
  //   axios.get(`/xuexi/page/${page}`).then(({ data }: { data: response }) => {
  //     setData(data.data);
  //     setTotal(data.total);
  //   });
  // }, [page]);

  useEffect(() => {
    axios.get("/video").then(res => {
      setVideoData(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/xuexi/page/${page}`).then(({ data }: { data: response }) => {
      setData(data.data);
      setTotal(data.total);
    });
  }, [page]);

  const XueXiItem = (item: XueXiType): JSX.Element => {
    return (
      <article className={style.xuexi}>
        {/* <style jsx>
          {`
            div {
              color: red;
            }
          `}
        </style> */}
        <h2>
          <a href={item.url} rel="nofollow">
            {item.title}
          </a>
        </h2>
        <time>{item.publishTime}</time>
        <div className={style.content}>{item.introduce}</div>
        <div className={style.tags}>
          <span>来源:</span>
          {item.channelNames.map(item => {
            return <span key={item + Math.random()}>{item}</span>;
          })}
          <span style={{ marginLeft: "20px" }}>相关记者:</span>
          {JSON.parse(item.editor + "").map(item => {
            return <span key={item + Math.random()}>{item}</span>;
          })}
        </div>
      </article>
    );
  };

  //学习强国页面
  return (
    <>
      <Carousel autoplay dotPosition={"left"} className={style.carousel}>
        <div>
          <img src="/theCommunistParty1.jpg" alt="" />
        </div>
        <div>
          <img src="/theCommunistParty2.jpg" alt="" />
        </div>
        <div>
          <img src="/theCommunistParty3.jpg" alt="" />
        </div>
      </Carousel>

      <div className={style.video}>
        {videoData.map((item: videoDataTypes) => {
          return (
            <Tooltip key={item.title} placement="top" title={item.title}>
              <a href={item.url} rel="nofollow">
                <img src={item.thumbImage} />
              </a>
            </Tooltip>
          );
        })}
      </div>

      <main>
        {data.map((item: XueXiType) => {
          return <XueXiItem key={item.itemId} {...item} />;
        })}
      </main>
      <Pagination
        onChange={page => setPage(page)}
        className={style.pagination}
        defaultCurrent={1}
        total={total}
      />
    </>
  );
}
export default memo(theCommunistParty);
