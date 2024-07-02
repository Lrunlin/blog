"use client";

import { createContext, useContext, useRef } from "react";
import { FC } from "react";
import { StoreApi, useStore } from "zustand";
import {
  UserDataStore,
  UserInfoDataType,
  UserInfoType,
  createUserDataStore,
  defaultInitState,
} from "./store";

export type { UserInfoDataType };
export const UserDataStoreContext =
  createContext<StoreApi<UserDataStore> | null>(null);

export interface UserDataStoreProviderProps {
  children: any;
  data: UserInfoType;
}

export const UserDataStoreProvider: FC<{
  children: any;
  data: UserInfoType;
}> = ({ children, data = defaultInitState }: UserDataStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserDataStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserDataStore(data);
  }

  return (
    <UserDataStoreContext.Provider value={storeRef.current!}>
      {children}
    </UserDataStoreContext.Provider>
  );
};

const useUserData = <T,>(selector: (store: UserDataStore) => T): T => {
  const userDataStoreContext = useContext(UserDataStoreContext);

  if (!userDataStoreContext) {
    throw new Error(`useUserData必须在UserDataStoreProvider中使用`);
  }

  return useStore(userDataStoreContext, selector);
};

export default useUserData;
