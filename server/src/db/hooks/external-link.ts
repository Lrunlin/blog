import { setData } from "@/common/modules/cache/external-link";
import type { ExternalLink, ExternalLinkAttributes } from "../models/init-models";
import init from "./utils/init";

export default init<ExternalLink, ExternalLinkAttributes>(async (model, type) => {
  setData();
});
