import type { FunctionComponent } from "react";

/** Action 组件GitHub项目名部分的骨架屏*/
const Skeleton: FunctionComponent = props => {
  return (
    <>
      <style jsx>{`
        .skeleton {
          background-color: rgb(243, 243, 243);
          width: 100%;
          height: 40px;
          margin-top: 5px;
        }
      `}</style>
      <div className="skeleton"></div>
      <div className="skeleton"></div>
    </>
  );
};
export default Skeleton;
