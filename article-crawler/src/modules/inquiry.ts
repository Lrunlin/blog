/*
  todo 控制台询问用户配置并获取答案
  @param {string} str 询问的问题
  @return {string} value 答案
*/
import readline from "readline";


const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function inquiry(str: string) {
  let p: Promise<string> = new Promise(seccess => {
    rl.question(str, (answer: string) => {
      seccess(answer);
    });
  });
  return p;
}

//?导出使用和关闭
export { rl, inquiry };