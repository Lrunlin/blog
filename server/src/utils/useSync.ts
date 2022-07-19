interface ResponsrType {
  code: number;
  msg: string;
  data: any;
}
/**
 * 使用await Promise来解决Koa的坑
 * @parmas callback {function} 执行带有回调函数的函数
 */
async function sync(callback: (resolve: any) => void) {
  return new Promise((resolve, reject) => {
    callback(resolve);
  });
}
export default sync;
