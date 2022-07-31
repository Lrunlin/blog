import axios from "axios";
import type { TypeAttributesList } from "@type/type";
import type { response } from "@type/response";
async function getType() {
  let res = await axios.get<response<TypeAttributesList[]>>("/type-tree");
  return res.data.data;
}
export default getType;
