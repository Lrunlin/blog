//单个文章数据
interface articleData {
  title: string;
  html: string;
  type: string[];
  time: string;
  href: string;
}
// 用户抓取配置(输出)
interface userOption {
  number: number;
  image: boolean;
  time: boolean;
  keyword: boolean | string;
  prohibited: boolean | string;
  a: boolean;
  type: string;
}
// 输出数据格式
interface outputData {
  time: string;
  option: userOption;
  data: articleData[];
}
export type { articleData, userOption, outputData };
