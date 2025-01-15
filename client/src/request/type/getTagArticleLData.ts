import { propsType } from "@/app/tag/article/[id]/page";
import axios from "@axios";
import { response } from "@type/common/response";

const getTagArticleLData = (page: number, id: string) =>
  axios
    .get<
      response<propsType["data"]>
    >(`/article/tag/${id}`, { params: { page } })
    .then((res) => res.data.data);

export default getTagArticleLData;
