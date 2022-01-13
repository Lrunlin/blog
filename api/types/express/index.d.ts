declare namespace Express {
  interface Request {
    authentication?: "admin" | "user";
    admin?: string; //管理员id
    userId?: string; //用户/管理员(admin)的GitHub_id
  }
}
