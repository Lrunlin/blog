import { cookies, headers } from "next/headers";
import AdminLayout from "@/layout/Admin/Base";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let cookie = await cookies();
  let header = await headers();

  return header.get("x-pathname") ? (
    <AdminLayout collapsed={cookie.get("xxx-collapsed")?.value}>
      {children}
    </AdminLayout>
  ) : (
    <>{children}</>
  );
}
