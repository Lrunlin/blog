import { useState, useEffect } from "react";
import { currentArticleDataContext } from "@/pages/article/[id]";
import { useRecoilValue } from "recoil";
import useUserData from "@/store/user-data";
import Image from "@/components/next/Image";
import classNames from "classnames";
import { useRouter } from "next/router";
import axios from "axios";
import { message, Badge } from "antd";

let itemClassName = classNames([
  "w-14",
  "h-14",
  "text-[#707070]",
  "flex",
  "items-center",
  "justify-center",
  "bg-white",
  "rounded-full",
  "shadow-md",
  "hover:shadow-xl",
  "cursor-pointer",
  "opacity-70",
  "hover:opacity-100",
  "text-xl",
]);

const ToolBar = () => {
  let [userData] = useUserData();
  let rotuer = useRouter();
  let id = rotuer.query.id;

  const [collectionState, setCollectionState] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (!userData) {
      return;
    }
    axios.get(`/collection/state/${id}`).then(res => setCollectionState(res.data.success));
  }, [userData]);

  function collection() {
    axios.post(`/collection/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setCollectionState(true);
      } else {
        message.error(res.data.message);
      }
    });
  }
  function unCollection() {
    axios.delete(`/collection/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setCollectionState(false);
      } else {
        message.error(res.data.message);
      }
    });
  }

  let currentArticleData = useRecoilValue(currentArticleDataContext);
  return (
    <div className="fixed top-32 left-[calc(50vw-680px)] select-none">
      <a className={classNames([itemClassName, "block"])} href="#comment">
        <Badge count={currentArticleData.comment_count}>
          <Image src="/icon/comment.png" height={24} width={24} />
        </Badge>
      </a>
      <div
        className={classNames([itemClassName, "mt-4", "hover:text-blue-500"])}
        onClick={
          collectionState == undefined ? () => {} : collectionState ? unCollection : collection
        }
      >
        {collectionState ? (
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M284.458667 941.397333c-36.437333 15.637333-68.48-7.68-64.896-47.168l22.613333-248.917333-164.394667-188.053333c-26.069333-29.824-13.653333-67.562667 24.789334-76.309334l243.370666-55.381333 127.786667-214.677333c20.288-34.090667 59.946667-34.069333 80.213333 0l127.786667 214.677333 243.370667 55.381333c38.656 8.789333 50.858667 46.485333 24.789333 76.309334l-164.394667 188.053333 22.741334 249.002667c3.605333 39.509333-28.458667 62.805333-64.896 47.146666l-229.504-98.517333-229.376 98.453333z"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M248.482281 938.000324c-4.306072 0-8.592702-1.336438-12.211113-3.967358-6.395664-4.646833-9.600659-12.521175-8.264221-20.314675l48.430012-282.363949L71.288626 431.382914c-5.66093-5.519714-7.698333-13.772678-5.255701-21.291932 2.444679-7.519254 8.943696-13.000082 16.768919-14.137998l283.508006-41.195238L493.099535 97.853655c3.498684-7.089465 10.720156-11.577686 18.627243-11.577686 7.907087 0 15.127536 4.489244 18.627243 11.577686l126.788661 256.904091 283.510052 41.195238c7.823176 1.137916 14.322194 6.618744 16.766872 14.137998 2.442632 7.519254 0.405229 15.773242-5.255701 21.291932L747.012502 631.354342l48.430012 282.363949c1.336438 7.7935-1.868557 15.667841-8.264221 20.314675-6.399757 4.646833-14.878872 5.257747-21.874193 1.582031L511.726777 802.298666 258.146385 935.614997C255.107165 937.211355 251.789607 938.000324 248.482281 938.000324zM130.422422 431.011454 313.25654 609.228415c4.894474 4.7727 7.128351 11.647271 5.974062 18.385742l-43.163055 251.64532 225.994104-118.811989c6.048763-3.180436 13.282514-3.180436 19.331277 0l225.992057 118.811989-43.163055-251.64532c-1.154289-6.738471 1.079588-13.613042 5.974062-18.385742l182.833095-178.216961-252.665557-36.71418c-6.767124-0.983397-12.614296-5.233188-15.641235-11.362792L511.726777 153.97893 398.729214 382.934482c-3.025916 6.129604-8.874111 10.379395-15.639189 11.362792L130.422422 431.011454z"></path>
          </svg>
        )}
      </div>
    </div>
  );
};
export default ToolBar;
