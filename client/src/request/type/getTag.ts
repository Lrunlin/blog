import axios from "@axios";
import type { response } from "@type/response";
import type { TagAttributes, TagTreeAttributes } from "@type/type";

async function getTag<T extends "tag" | "type" | "tree">(
  type: T,
): Promise<T extends "tree" ? TagTreeAttributes[] : TagAttributes[]> {
  const res = await axios.get<
    response<T extends "tree" ? TagTreeAttributes[] : TagAttributes[]>
  >("/tag", { params: { type } });
  return res.data.data;
}

export default getTag;
