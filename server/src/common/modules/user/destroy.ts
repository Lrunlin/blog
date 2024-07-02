import DB from "@/db";
import Identicon from "identicon.js";
import sha1 from "sha1";
import removeSession from "@/common/utils/auth/destroy-session";
import id from "@/common/utils/id";
import sha256 from "@/common/utils/sha256";
import { upload } from "@/common/utils/static";

async function destroy(user_id: number) {
  let data = new Identicon(sha1(user_id + ""), {
    size: 80,
    format: "svg",
    background: [240, 240, 240, 255],
  }).toString();

  let uploadResult = await upload(Buffer.from(data, "base64"), {
    folder: "avatar",
    file_name: `${id()}.webp`,
  })
    .then((res) => ({
      success: true,
      fileName: (res as any).file_name as string,
    }))
    .catch((err) => ({ success: false, errMes: err }));

  if (!uploadResult.success) {
    return { success: false, message: "注销失败，请稍后再试" };
  }

  let userData = await DB.User.findByPk(user_id, {
    attributes: ["email"],
    raw: true,
  });
  let decode = sha256(userData!.email);

  return DB.User.update(
    {
      name: `用户-${user_id}`,
      github: null as any,
      qq: null as any,
      email: `${decode}@destroy.com`,
      description: null as any,
      location: null as any,
      site: null as any,
      unit: null as any,
      avatar_file_name: (uploadResult as any).fileName,
      password: Math.random() + process.env.SITE_API_HOST + +new Date(),
      state: 0,
    },
    {
      where: { id: user_id },
    },
  )
    .then(([row]) => {
      if (row) {
        removeSession(user_id);
        return { success: true, message: "注销成功" };
      } else {
        return { success: false, message: "注销失败" };
      }
    })
    .catch((err) => {
      console.log(err);
      return { success: false, message: "注销失败" };
    });
}
export default destroy;
