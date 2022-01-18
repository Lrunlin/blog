import fs from "fs";
import path from "path";

/**
todo 用户统计发送统计数据后返回用户的JS代码信息
@return {string} text 打印的信息
@? 文字使用VScode插件:ASCIIDecorator生成  
*/
const consoleText =fs.readFileSync(path.join(__dirname, `./connsole-text.txt`)).toString();

export default consoleText;
