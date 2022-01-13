interface userEmail {
  [key: string]: string;
}
let userEmail: userEmail = {};

function addUserEmail(email: string, code: string): void {
  userEmail[email] = code;
  setTimeout(() => {
    delete userEmail[email];
  }, 1_800_000);
}

function hasUserEmail(email: string, code: string): boolean {
  return userEmail[email] == code;
}
export { addUserEmail, hasUserEmail };
