/**
 * 使用await Promise来解决Koa的坑
 * @parmas callback {function} 执行带有回调函数的函数
 */
async function sync(callback: (resolve: any, reject:any) => void) {
  return new Promise((resolve, reject) => {
    callback(resolve, reject);
  });
}
export default sync;
