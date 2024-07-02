import jwt from "jsonwebtoken";

interface decodeType {
  [key: string]: any;
}

async function verify(token: string): Promise<decodeType> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.KEY as string,
      async function (err, decoded: any) {
        if (err) {
          reject();
        } else {
          resolve(decoded);
        }
      },
    );
  });
}
export default verify;
