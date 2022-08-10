/** 服务端返回数据模板*/
interface response<T = undefined> {
  success: boolean;
  message: string;
  data: T;
}
export type { response };
