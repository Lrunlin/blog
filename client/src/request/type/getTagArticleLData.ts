import axios from "@axios";
import { response } from "@type/common/response";
import { propsType } from "@/app/tag/[name]/article/page";

const getTagArticleLData = (page: number, name: string) =>
  axios
    .get<response<propsType["data"]>>(`/article/tag/${name}`, { params: { page } })
    .then(res => res.data.data);

export default getTagArticleLData;