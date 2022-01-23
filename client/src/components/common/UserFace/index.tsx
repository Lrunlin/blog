import { useState, useEffect, FunctionComponent, memo, useContext } from "react";
import { Context } from "@/store";
import axios from "axios";
import Image from "next/image";

interface propsTypes {
  userId: string;
  className?: string;
  width: number;
  height: number;
}
const Face: FunctionComponent<propsTypes> = props => {
  let store = useContext(Context);
  const [userFaceData, setUserFaceData] = useState(
    props.userId == "admin" ? "/image/admin-face-default.png" : "/image/user-face-default.png"
  );

  useEffect(() => {
    const getImage = async () => {
      axios.get(`${store.assetsPath}/user/face`).then(res => {
        if (res.data.success) setUserFaceData(`${store.CDN}/face/${res.data.data}`);
      });
    };
    props.userId && props.userId != "admin" && getImage();
  }, [props.userId]);

  return (
    <>
      <Image
        width={props.width}
        height={props.height}
        className={props.className}
        src={userFaceData}
        alt="用户头像"
        unoptimized={true}
      />
    </>
  );
};
export default Face;
