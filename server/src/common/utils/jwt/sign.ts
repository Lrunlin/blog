import jwt from "jsonwebtoken";
function sign(id: number) {
  return jwt.sign(
    {
      id: id,
      auth: 0,
    },
    process.env.KEY as string,
    { expiresIn: "365d" }
  );
}
export default sign;
