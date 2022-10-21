import jwt from "jsonwebtoken";

async function verify(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token as string, process.env.KEY as string, async function (err, decoded: any) {
      if (err) {
        reject();
      } else {
        resolve(decoded);
      }
    });
  });
}
export default verify;
