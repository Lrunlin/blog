"use client";

import axios from "@axios";
import { create } from "zustand";

export interface UserInfoDataType {
  avatar_url: string;
  id: number;
  name: string;
  auth: number;
  avatar_file_name: string;
  create_time: string;
}

export type UserInfoType = { data: UserInfoDataType | null };

export type UserDataActions = {
  refreshData: () => void;
  setData: (data: UserInfoDataType | null) => any;
};

export type UserDataStore = UserInfoType & UserDataActions;

export const defaultInitState: UserInfoType = { data: null };

export const createUserDataStore = (
  initState: UserInfoType = defaultInitState,
) => {
  return create<UserDataStore>((set) => ({
    ...initState,
    refreshData: () => {
      axios
        .get("/user/info")
        .then((res) => {
          set(() => ({ data: res.data.data || null }));
        })
        .catch(() => set({ data: null }));
    },
    setData: (data: UserInfoDataType | null) => set({ data: data }),
  }));
};
