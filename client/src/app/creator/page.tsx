"use client";

import axios from "@axios";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useFetch from "@/common/hooks/useFetch";
import NoFollowLink from "@/components/next/NoFollowLink";
import Layout from "@/components/page/creator/Layout";
import useUserData from "@/store/user/user-data";

const APP = () => {
  let {
    data: advertisementData,
    isLoading,
    error,
  } = useFetch(() =>
    axios
      .get("/advertisement", { params: { position: "creator" } })
      .then((res) => res.data.data),
  );
  let userInfo = useUserData((s) => s.data);
  let { data: userData } = useFetch(() =>
    axios.get(`/user/data/${userInfo?.id}`).then((res) => res.data.data),
  );

  return (
    <Layout>
      <div className="shadow-sm">
        {/* 顶部轮播图部分 */}
        <div className="h-60 w-full bg-white">
          {isLoading && <div className="h-full w-full bg-gray-200"></div>}
          {error && (
            <div className="flex h-full w-full items-center justify-center">
              请求错误
            </div>
          )}
          {advertisementData && (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop
              autoplay={{ delay: 4000 }}
              pagination={{
                clickable: true,
                bulletClass:
                  "w-12 h-1.5 mx-2 bg-gray-100 inline-block rounded-sm opacity-70 cursor-pointer",
                bulletActiveClass: "bg-blue-300 opacity-90",
              }}
              className="h-full w-full"
              // swiper-no-swiping 禁止拖动
            >
              {advertisementData.map((item: any) => {
                return (
                  <SwiperSlide key={item.id}>
                    <NoFollowLink href={item.url} className="block select-none">
                      <img
                        className="block h-full w-full"
                        src={item.poster_url}
                        alt="推广"
                      />
                    </NoFollowLink>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
        {/* 数据展示 */}
        <div className="mt-2 flex w-full justify-around bg-white p-4 shadow-sm">
          <div className="text-center">
            <div className="text-base">发布文章</div>
            <div>{userData?.article_count}</div>
          </div>
          <div className="text-center">
            <div className="text-base">粉丝数量</div>
            <div>{userData?.follower_count}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default APP;
