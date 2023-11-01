import crypto from "crypto";

function sha256(plaintext: string) {
  const sha256Hash = crypto.createHash("sha256");
  sha256Hash.update(plaintext);
  return sha256Hash.digest("hex");
}
export default sha256;
