import {  useEffect, useRef } from "react";
import type { FC } from "react";
// import { Upload } from "antd";
import Upload from "@/components/common/UpLoad";
interface propsType {
  avatar_file_name: string;
  avatar_url: string;
  onChange: (value: string) => void;
}

const UploadAvatar: FC<propsType> = props => {
  let first = useRef(true);
  useEffect(() => {
    if (first.current) {
      props.onChange(props.avatar_file_name);
      first.current = false;
    }
  }, [props.avatar_file_name]);

  return (
    <>
      <Upload
        url="avatar"
        imgURL={props.avatar_url}
        width={90}
        onSuccess={data => {
          props.onChange(data.file_name);
        }}
        onDelete={() => {
          props.onChange("");
        }}
      />
    </>
  );
};
export default UploadAvatar;
