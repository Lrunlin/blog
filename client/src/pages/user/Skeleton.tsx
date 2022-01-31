import type { FunctionComponent } from "react";

const Skeleton: FunctionComponent = () => {
  return (
    <>
      <style jsx>{`
        .skeleton-header {
          height: 320px;
          background-color: white;
        }
        .skeleton-body {
          height: 600px;
          background-color: white;
          margin-top: 10px;
        }
        .skeleton-bar {
          background-color: rgb(241, 241, 241);
          width: calc(100% - 20px);
          height: calc(100% - 20px);
          margin: 0px auto;
          position: relative;
          top: 10px;
          animation: twinkle 3s infinite;
        }
        @keyframes twinkle {
          0% {
            background-color: rgb(241, 241, 241);
          }
          50% {
            background-color: rgb(214, 214, 214);
          }
          100% {
            background-color: rgb(241, 241, 241);
          }
        }
      `}</style>
      <div className="skeleton-header">
        <div className="skeleton-bar"></div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-bar"></div>
      </div>
    </>
  );
};
export default Skeleton;