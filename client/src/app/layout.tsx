import { cookies } from "next/headers";
import axios from "@axios";
import Sign from "@/components/common/Header/Sign";
import Antd from "@/plugin/antd";
import { UserDataStoreProvider } from "@/store/user/user-data";
import "@/styles/globals.scss";
import "@/styles/reset.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // user_info
  const cookie = await cookies();
  const token = cookie.get("token");
  let userInfo = token?.value
    ? await axios
        .get("/user/info", {
          headers: { Authorization: token?.value },
        })
        .then((res) => ({ data: res.data.data || null }))
        .catch(() => ({ data: null }))
    : { data: null };

  return (
    <html lang="zh-CN">
      <body>
        <UserDataStoreProvider data={userInfo}>
          <Antd>{children}</Antd>
          <Sign />
        </UserDataStoreProvider>
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic";
