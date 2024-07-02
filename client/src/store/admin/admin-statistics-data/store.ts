import axios from "@axios";
import { statisticsDataType } from "@type/statistics-type";
import { create } from "zustand";

export type AdminStatisticsDataType = { data: statisticsDataType };

export type AdminStatisticsDataActions = {
  refreshData: () => void;
  setData: (data: statisticsDataType) => any;
};

export type AdminStatisticsDataStore = AdminStatisticsDataType &
  AdminStatisticsDataActions;

export const defaultInitState = { data: {} as statisticsDataType };

export const createAdminStatisticsDataStore = (
  initState: AdminStatisticsDataType = defaultInitState,
) => {
  return create<AdminStatisticsDataStore>((set) => ({
    ...initState,
    refreshData: () => {
      axios
        .get("/user/info")
        .then((res) => {
          set(() => ({ data: res.data.data || null }));
        })
        .catch(() => set({ data: {} as any }));
    },
    setData: (data: statisticsDataType) => set({ data: data }),
  }));
};
