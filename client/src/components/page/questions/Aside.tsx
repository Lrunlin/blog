import AdSense from "@/components/common/AdSense";
import Advertisement from "@/components/common/Advertisement";
const Aside = () => {
  return (
    <aside className="sm:hidden">
      <div className="w-60">{/* 占位用的防止左侧内容偏移 */}</div>
      <Advertisement type="article" />
      <AdSense />
    </aside>
  );
};
export default Aside;
