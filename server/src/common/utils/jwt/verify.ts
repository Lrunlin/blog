import jwt from "jsonwebtoken";

async function verify(token: string): Promise<{ id: number; auth: 0 | 1 }> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.KEY as string, async function (err, decoded: any) {
      if (err) {
        reject();
      } else {
        resolve(decoded);
      }
    });
  });
}
export default verify;
