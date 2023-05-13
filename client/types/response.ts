interface response<T=undefined> {
  success:boolean;
  message:string;
  data:T
}
export type { response };
