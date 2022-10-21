import type { FC, ReactNode } from "react";
import { RecoilRoot, RecoilEnv } from "recoil";
import { userDataContext } from "@/store/user-data";
import type { UserStateAttributes } from "@/store/user-data";

import dynamic from "next/dynamic";
const Sign = dynamic(import("@/components/common/Header/Sign"), { ssr: false });

export type userInfo = UserStateAttributes | null;
interface propsType {
  children: ReactNode;
  userInfo: userInfo;
}
// 服务端禁用key检查
if (typeof window == "undefined") {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}
const Recoil: FC<propsType> = ({ children, userInfo }) => {
  return (
    <RecoilRoot initializeState={({ set }) => set(userDataContext, userInfo)}>
      {children}
      <Sign />
    </RecoilRoot>
  );
};
export default Recoil;
