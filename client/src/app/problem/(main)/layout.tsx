import type { FC, ReactNode } from "react";
import ProblemLayout from "@/components/page/problem/Layout";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <ProblemLayout>{children}</ProblemLayout>;
};
export default Layout;
