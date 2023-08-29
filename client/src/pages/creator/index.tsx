import type { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";
import Layout from "@/components/page/creator/Layout";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NoFollowLink from "@/components/next/NoFollowLink";
import useUserData from "@/store/user-data";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const APP: NextPage = () => {
  let {
    data: advertisementData,
    isValidating,
    error,
  } = useSWR("advertisement-crtator", () =>
    axios.get("/advertisement", { params: { position: "creator" } }).then(res => res.data.data)
  );
  let [userInfo] = useUserData();
  let { data: userData } = useSWR(`user-data-${userInfo?.id}`, () =>
    axios.get(`/user/data/${userInfo?.id}`).then(res => res.data.data)
  );

  return (
    <Layout>
      <div className="shadow-sm">
        {/* 顶部轮播图部分 */}
        <div className="w-full h-60 bg-white">
          {isValidating && <div className="w-full h-full bg-gray-200"></div>}
          {error && <div className="w-full h-full flex items-center justify-center">请求错误</div>}
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
              className="w-full h-full"
              // swiper-no-swiping 禁止拖动
            >
              {advertisementData.map((item: any) => {
                return (
                  <SwiperSlide key={item.id}>
                    <NoFollowLink href={item.url} className="block select-none">
                      <img className="block w-full h-full" src={item.poster_url} alt="推广" />
                    </NoFollowLink>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
        {/* 数据展示 */}
        <div className="w-full mt-2 p-4 bg-white flex justify-around shadow-sm">
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
