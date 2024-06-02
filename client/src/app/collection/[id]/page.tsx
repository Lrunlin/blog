import { notFound } from "next/navigation";
import axios from "@axios";
import Brow from "@/components/page/collection/Brow";
import Base from "@/layout/Base";
import { RootObject } from "@type/model/favorites-collection-list";
import { response } from "@type/response";
import Collection from "@/components/page/collection/Collection";
import Head from "@/components/next/Head";

const FavoritesList = async ({ params: { id } }: { params: { id: string } }) => {
  let data = await axios
    .get<response<RootObject>>(`/favorites/list/${id}`)
    .then(res => res.data.data)
    .catch(() => {
      return null;
    });

  if (!data) {
    notFound();
  }

  return (
    <>
      <Head title={`收藏夹-${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <Base brow={<Brow authorData={data.author_data} favoritesData={data.favorites_data} />}>
        <Collection data={data} />
      </Base>
    </>
  );
};

export default FavoritesList;
