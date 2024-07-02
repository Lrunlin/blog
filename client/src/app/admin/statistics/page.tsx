import { cookies } from "next/headers";
import axios from "@axios";
import type { response } from "@type/response";
import { statisticsDataType } from "@type/statistics-type";
import Statistics from "@/components/admin/page/statistics/Statistics";
import Head from "@/components/next/Head";
import { AdminStatisticsDataStoreProvider } from "@/store/admin/admin-statistics-data";

const Page = async () => {
  const cookie = cookies();
  const token = cookie.get("token");

  let data = await axios
    .get<response<statisticsDataType>>("/statistics/visualization", {
      headers: { authorization: token?.value },
    })
    .then((res) => res.data.data);

  return (
    <AdminStatisticsDataStoreProvider data={data}>
      <Head title="数据分析" />
      <div
        className="min-h-screen min-w-full"
        id="screen"
        style={{
          backgroundImage: `url(${process.env.CDN}/image/admin/statistics/bg.jpg)`,
          backgroundSize: "100vw 100vh",
        }}
      >
        <div className="pt-[0.25vw] text-center text-2xl font-black text-statistics-cyan-color">
          数据分析
        </div>
        <Statistics data={data} />
      </div>
    </AdminStatisticsDataStoreProvider>
  );
};
export default Page;
