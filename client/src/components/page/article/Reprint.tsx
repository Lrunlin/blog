import type { FC } from "react";

interface propsType {
  reprint?: string | null;
}

const Reprint: FC<propsType> = ({ reprint }) => {
  return (
    <>
      {reprint && (
        <blockquote className="mt-20 pl-4 border-l-solid border-l-4 rounded-sm border-l-blue-600">
          转载自:{reprint}
        </blockquote>
      )}
    </>
  );
};
export default Reprint;
