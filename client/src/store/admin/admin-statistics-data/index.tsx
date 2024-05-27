import { createContext, useRef, useContext } from "react";
import { FC } from "react";
import { StoreApi, useStore } from "zustand";
import { statisticsDataType } from "@/pages/admin/statistics";

import {
  AdminStatisticsDataStore,
  createAdminStatisticsDataStore,
  AdminStatisticsDataType,
} from "./store";

export type { AdminStatisticsDataType };
export const AdminStatisticsDataStoreContext =
  createContext<StoreApi<AdminStatisticsDataStore> | null>(null);

export interface AdminStatisticsDataStoreProviderProps {
  children: any;
  data: statisticsDataType;
}

export const AdminStatisticsDataStoreProvider: FC<{
  children: any;
  data: statisticsDataType;
}> = ({ children, data = {} as statisticsDataType }: AdminStatisticsDataStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AdminStatisticsDataStore>>();
  if (!storeRef.current) {
    storeRef.current = createAdminStatisticsDataStore({ data: data });
  }

  return (
    <AdminStatisticsDataStoreContext.Provider value={storeRef.current!}>
      {children}
    </AdminStatisticsDataStoreContext.Provider>
  );
};

const useAdminStatisticsData = <T,>(selector: (store: AdminStatisticsDataStore) => T): T => {
  const adminStatisticsDataStoreContext = useContext(AdminStatisticsDataStoreContext);

  if (!adminStatisticsDataStoreContext) {
    throw new Error(`useAdminStatisticsData必须在useAdminStatisticsData中使用`);
  }

  return useStore(adminStatisticsDataStoreContext, selector);
};

export default useAdminStatisticsData;
