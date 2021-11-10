import { inquiry, rl } from "./inquiry";
import cheerio from "cheerio";
import axios from "axios";
import { userOption } from "../types";
interface typeTagType {
  index: number;
  label: string;
  href: string;
}

interface optionSwitchType {
  number: (value: string) => number;
  image: (value: string) => boolean;
  time: (value: string) => boolean;
  keyword: (value: string) => string | boolean;
  prohibited: (value: string) => string | boolean;
  a: (value: string) => boolean;
  type: (value: string) => string;
}

const optionList = async () => {
  /****处理文章类型****/
  let typeMessage: string = ""; //获取tag之后拼接
  let tagStringData: string =
    (await axios.get("https://segmentfault.com/tags")).data +
    "" +
    (await axios.get("https://segmentfault.com/tags?sort=hottest&page=2")).data;
  let typeTag: typeTagType[] = [];
  let tag1Dom = cheerio.load(tagStringData);
  tag1Dom(".badge-tag.mb-2").each((index, item) => {
    typeTag.push({
      index: index,
      label: tag1Dom(item).text(),
      href: decodeURI(tag1Dom(item).attr("href") + "").replace("/t/", ""),
    });
  });

  typeTag.forEach(item => {
    typeMessage += `${item.index}.${item.label}\n`;
  });

  let number: string = await inquiry("抓取文章数量?(number)");
  let image: string = await inquiry("是否允许包含图片？（Y/N）");
  let time: string = await inquiry("是否只要三年之内的文章？（Y/N）");
  let keyword: string = await inquiry("文章要求必须有某个关键字？（string/N）");
  let prohibited: string = await inquiry("文章禁止包含某个关键词？（string/N）");
  let a: string = await inquiry("是否允许包含超链接？（Y/N）");
  let type: string = await inquiry(`选择查询的文章类型（输入序号）\n ${typeMessage}`);

  let typeResult = typeTag.find(item => item.index == +type);//类型选择结果
  type = typeResult?.href || "javascript"; //不写或者没找到就默认js

  rl.close();

  let option = {
    number,
    image,
    time,
    keyword,
    prohibited,
    a,
    type,
  };

  let test: RegExp = /^[\s\S]*.*[^\s][\s\S]*$/;
  //默认
  // {
  //     number: 10,
  //     image: false,
  //     time: false,
  //     keyword: false,
  //     prohibited: false,
  //     a: false
  //     type:javascript
  // }

  //todo 将用户输入的配置转换成可以直接输出的配置
  let optionSwitch: optionSwitchType = {
    number: value => (isNaN(+value) ? +value : +value < 1 ? 10 : +value), //如果输入错误默认为10
    image: value => value.toLowerCase() == "y",
    time: value => value.toLowerCase() == "y",
    keyword: value => (value.toLowerCase() == "n" || !test.test(value) ? false : value),
    prohibited: value => (value.toLowerCase() == "n" || !test.test(value) ? false : value),
    a: value => value.toLowerCase() == "y",
    type: value => value,
  };
  function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
    return key in object;
  }
  let outputOption: any = {};
  Object.values(option).forEach((value: string, index: number) => {
    let key = Object.keys(option)[index];
    outputOption[key] = value;
    if (isValidKey(key, optionSwitch)) {
      outputOption[key] = (optionSwitch[key] as any)(value);
    }
  });
  return outputOption as userOption;
};
export default optionList;
