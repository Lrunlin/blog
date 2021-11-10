import puppeteer from "puppeteer";
import fs from "fs";
import optionList from "./modules/optionList"; //获取用户配置
import qualified from "./modules/qualified"; //判断是否符合要求
import { articleData, userOption } from "./types/index";
let data: articleData[] = []; //文章数据
let nowPage: number = 1; //当前页数

// explorer "http://127.0.0.1/"

(async () => {
  const option: userOption = await optionList(); //用户配置

  console.log("开始运行");
  console.log(option);

  const browser = await puppeteer.launch({
    headless: false, //是否不显示浏览器
    // slowMo: 100,
    // devtools: true
    defaultViewport: {
      width: 1200,
      height: 800,
    },
  });
  const page = await browser.newPage();

  /*
  todo 获取当前页数的文章目录
  @param {number} page 需要获取的页数
  @return {number[]} href 当前页数的文章目录
  */
  async function getPage(nowPage: number): Promise<string[]> {
    // todo 根据页数进入指定的页面
    await page.goto(`https://segmentfault.com/t/${option.type}/blogs?page=${nowPage}`, {
      timeout: 10000 * 60,
    });
    await page.waitForSelector(".title.text-body");
    let href: (string | false)[] = await page.$$eval(".title.text-body", (el: Element[]) => {
      return el.map(item => {
        //?有的时候没有网站主域名.判断一下没有关键字添加一下
        let href = item.getAttribute("href") || false;
        let _href =
          !href || href.includes("segmentfault") ? href : `https://segmentfault.com${href}`;
        return _href;
      });
    });

    return href.filter(item => !!item) as string[];
    //!!我也不知明明过滤了这破玩意为啥报错，直接断言算了
  }

  /*
  todo 根据链接获取对应文章的具体数据
  @param {string} href 需要被查询的文章
  @return {object} data 对应文章信息
  */
  async function getData(href: string): Promise<articleData> {
    console.log(`页数:${nowPage},已有:${data.length},链接：${href}`);
    let articleData: articleData = { title: "", html: "", type: [], time: "", href: "" };

    try {
      await page.goto(href, {
        timeout: 10000 * 60,
      });
      //!保险起见等待所有需要的dom加载完成
      await page.waitForSelector("h1.h2.mb-3");
      await page.waitForSelector("article.article.article-content");
      await page.waitForSelector(".badge-tag");
      await page.waitForSelector(".text-secondary time");

      let title = (await page.$eval("h1.h2.mb-3", el => el.getAttribute("innerText"))) + ""; //文章标题
      let html = await page.$eval(
        "article.article.article-content",
        el => (el as HTMLElement).innerHTML
      ); //文章内容
      let type = await page.$$eval(".badge-tag", el => {
        return el.map(item => {
          return (item as HTMLElement).innerText;
        });
      });
      let time = (await page.$eval(".text-secondary time", el => el.getAttribute("datetime"))) + "";

      articleData = {
        title,
        html,
        type,
        time,
        href,
      };
    } catch (error) {
      console.log(error);
      //切换页面错误
    }
    return articleData;
  }

  function print() {
    fs.writeFileSync(
      "./article.json",
      JSON.stringify({
        time: new Date(),
        option,
        data,
      })
    );
    console.log("抓取完成");
    page.close();
  }

  async function collectData(): Promise<void|boolean> {
    let pageData = await getPage(nowPage); //文章链接目录
    console.log(`第${nowPage}页开始`);
    for (var index = 0; index < pageData.length; index++) {
      const item = pageData[index];

      //换页(页码加一，重复执行该函数)
      if (index == pageData.length - 1) {
        nowPage++;
        collectData();
        return false;
      }
      const articleData = await getData(item);

      // todo 判断是否合格
      if (qualified(articleData, option)) {
        data.push(articleData);
        if (data.length == option.number) {
          print();
          process.exit(1);
        }
      }
    }
  }
  collectData();
})();
