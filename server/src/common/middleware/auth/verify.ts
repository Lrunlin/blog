import jwt from "jsonwebtoken";
export default (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token as string, process.env.KEY as string, async function (err, decoded: any) {
      if (err) {
        reject();
      } else {
        resolve(decoded);
      }
    });
  });
