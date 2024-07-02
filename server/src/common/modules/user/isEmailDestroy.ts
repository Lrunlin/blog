import DB from "@/db";
import sha256 from "@/common/utils/sha256";

async function isEmailDestroy(email: string) {
  let decode = sha256(email);
  let exist = await DB.User.findOne({
    where: { email: `${decode}@destroy.com` },
    attributes: ["id"],
    raw: true,
  });
  return !!exist;
}
export default isEmailDestroy;
