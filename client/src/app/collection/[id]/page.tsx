import { notFound } from "next/navigation";
import axios from "@axios";
import { RootObject } from "@type/model/favorites-collection-list";
import { response } from "@type/response";
import Base from "@/layout/Base";
import Head from "@/components/next/Head";
import Brow from "@/components/page/collection/Brow";
import Collection from "@/components/page/collection/Collection";

const FavoritesList = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const { id } = params;

  let data = await axios
    .get<response<RootObject>>(`/favorites/list/${id}`)
    .then((res) => res.data.data)
    .catch(() => {
      return null;
    });

  if (!data) {
    notFound();
  }

  return (
    <>
      <Head title={`收藏夹-${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <Base
        brow={
          <Brow
            authorData={data.author_data}
            favoritesData={data.favorites_data}
          />
        }
      >
        <Collection data={data} />
      </Base>
    </>
  );
};

export default FavoritesList;
