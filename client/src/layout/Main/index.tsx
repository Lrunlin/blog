import type { FC, ReactNode } from "react";
import classNames from "classnames";

const Main: FC<{
  children: ReactNode;
  mainClassName?: classNames.ArgumentArray;
  containerClassName?: classNames.ArgumentArray;
}> = (props) => {
  return (
    <div
      className={classNames(["bg-[#f4f5f5]", "pt-2", props.containerClassName])}
    >
      <main
        className={classNames([
          "max-w-[960px]",
          "mx-auto",
          "flex",
          "justify-between",
          "min-h-screen",
          props.mainClassName,
        ])}
      >
        {props.children}
      </main>
    </div>
  );
};
export default Main;
