import jwt from "jsonwebtoken";

interface decodeType {
  id: number;
  auth: number;
  [key: string]: any;
}

async function sign(decode: decodeType) {
  return jwt.sign(decode, process.env.KEY as string, { expiresIn: "365d" });
}
export default sign;
