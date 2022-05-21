declare namespace Express {
  interface Request {
    authentication?: "admin" | "user";
    admin?: string; //管理员id
    userId?: string; //用户/管理员(admin)的GitHub_id
    //图片上传对象工具携带的File对象类型
    file?: Express.Multer.File;
  }
}
