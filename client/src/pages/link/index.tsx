import { Divider, Button } from "antd";
import { useSearchParams } from "next/navigation";
const Link = () => {
  const searchParams = useSearchParams();
  let textHref = searchParams
    .get("target")
    ?.match(
      /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div>
        <div className="flex items-center">
          <img src="/favicon.svg" alt="logo" className="w-10" />
          <span className="text-2xl ml-4">{process.env.NEXT_PUBLIC_SITE_NAME}</span>
        </div>
        <div className="mt-2 border-gray-300 border border-solid bg-white pt-7 pb-3 px-10 w-[530px]">
          <div className="text-lg">
            即将离开{process.env.NEXT_PUBLIC_SITE_NAME}，请注意账号财产安全
          </div>
          <div className="mt-2 text-gray-500 truncate">{textHref ? textHref[0] : "错误的链接"}</div>
          <Divider className="my-3" />
          <div className="flex justify-end">
            <Button type="primary" href={searchParams.get("target")!}>
              继续访问
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Link;
