import useUserWriteArticle from "@/store/user/user-write-article";
import Upload from "../../UpLoad";

const Cover = () => {
  let articleData = useUserWriteArticle((s) => s.data);
  let updateData = useUserWriteArticle((s) => s.updateData);

  return (
    <>
      <Upload
        target="cover"
        imgURL={articleData.cover_url || undefined}
        width={200}
        aspect={3 / 2}
        onSuccess={(data) =>
          updateData({
            cover_file_name: data.file_name,
            cover_url: data.file_href,
          })
        }
        onDelete={() => updateData({ cover_file_name: null, cover_url: null })}
      />
    </>
  );
};
export default Cover;
