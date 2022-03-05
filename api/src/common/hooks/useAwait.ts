/**
 * 传入一个Promise函数useAwait做错误处理并且返回错误信息
 * @params fun {Function} 需要做处理的函数
 * @return fun {Array} [then，catch][成功的返回结果，错误信息]
 */
async function useAwait<T = any>(fun: any) {
  try {
    return [await fun()] as [T];
  } catch (error) {
    return [, error] as [undefined, unknown];
  }
}
export default useAwait;
