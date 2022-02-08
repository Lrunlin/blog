import type { FunctionComponent } from "react";
import { props } from "./index";
import cl from "classnames";

type skeletonProps = Omit<props, "introduce">;

/** Article 组件introduce部分的骨架屏*/
const Skeleton: FunctionComponent<skeletonProps> = props => {
  return (
    <>
      <style jsx>{`
        .skeleton {
          background-color: rgb(243, 243, 243);
          width: 100%;
          height: 50px;
        }
        .skeleton-hasimage {
          height: 100px;
        }
      `}</style>
      <div className={cl(["skeleton", props.hasImage && "skeleton-hasimage"])}></div>
    </>
  );
};
export default Skeleton;
