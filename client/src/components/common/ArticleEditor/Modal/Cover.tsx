import { useRecoilState } from "recoil";
import { writeArticleContext } from "../index";
import Upload from "../../UpLoad";

const Cover = () => {
  const [articleData, setArticleData] = useRecoilState(writeArticleContext);

  return (
    <>
      <Upload
        target="cover"
        imgURL={articleData.cover_url || undefined}
        width={200}
        aspect={3 / 2}
        onSuccess={data => {
          setArticleData(_data => ({
            ..._data,
            cover_file_name: data.file_name,
            cover_url: data.file_href,
          }));
        }}
        onDelete={() => {
          setArticleData(data => ({ ...data, cover_file_name: null, cover_url: null }));
        }}
      />
    </>
  );
};
export default Cover;
