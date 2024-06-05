import { setData } from "@/common/modules/cache/advertisement";
import type { Advertisement, AdvertisementAttributes } from "../models/init-models";
import init from "./utils/init";

export default init<Advertisement, AdvertisementAttributes>(async (model, type) => {
  setData();
});
