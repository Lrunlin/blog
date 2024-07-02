import axios from "@axios";
import { response } from "@type/common/response";
import { ArticleAttributes, TagAttributes } from "@type/model-attribute";
import Layout from "@/components/page/tag/Layout";
import List from "@/components/page/tag/List";
import getTagArticleLData from "@/request/type/getTagArticleLData";

export interface propsType {
  data: {
    tag_data: TagAttributes;
    article_data: {
      total: number;
      list: ArticleAttributes[];
    };
  };
}

const Article = async ({ params: { name } }: { params: { name: string } }) => {
  let data = await getTagArticleLData(1, name);
  return (
    <Layout>
      <div className="bg-white p-4">
        <img
          className="w-14"
          src={data.tag_data.icon_url}
          alt={`${data.tag_data.name} ICON`}
        />
        <span className="ml-2 text-lg font-bold">{data.tag_data.name}</span>
      </div>
      <div className="mt-4 bg-white p-4">
        <List data={data} />
      </div>
    </Layout>
  );
};
export default Article;
