"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const optionList_1 = __importDefault(require("./modules/optionList"));
const qualified_1 = __importDefault(require("./modules/qualified"));
let data = [];
let nowPage = 1;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const option = yield (0, optionList_1.default)();
    console.log("开始运行");
    console.log(option);
    const browser = yield puppeteer_1.default.launch({
        headless: false,
        defaultViewport: {
            width: 1200,
            height: 800,
        },
    });
    const page = yield browser.newPage();
    function getPage(nowPage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.goto(`https://segmentfault.com/t/${option.type}/blogs?page=${nowPage}`, {
                timeout: 10000 * 60,
            });
            yield page.waitForSelector(".title.text-body");
            let href = yield page.$$eval(".title.text-body", (el) => {
                return el.map(item => {
                    let href = item.getAttribute("href") || false;
                    let _href = !href || href.includes("segmentfault") ? href : `https://segmentfault.com${href}`;
                    return _href;
                });
            });
            return href.filter(item => !!item);
        });
    }
    function getData(href) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`页数:${nowPage},已有:${data.length},链接：${href}`);
            let articleData = { title: "", html: "", type: [], time: "", href: "" };
            try {
                yield page.goto(href, {
                    timeout: 10000 * 60,
                });
                yield page.waitForSelector("h1.h2.mb-3");
                yield page.waitForSelector("article.article.article-content");
                yield page.waitForSelector(".badge-tag");
                yield page.waitForSelector(".text-secondary time");
                let title = (yield page.$eval("h1.h2.mb-3", el => el.getAttribute("innerText"))) + "";
                let html = yield page.$eval("article.article.article-content", el => el.innerHTML);
                let type = yield page.$$eval(".badge-tag", el => {
                    return el.map(item => {
                        return item.innerText;
                    });
                });
                let time = (yield page.$eval(".text-secondary time", el => el.getAttribute("datetime"))) + "";
                articleData = {
                    title,
                    html,
                    type,
                    time,
                    href,
                };
            }
            catch (error) {
                console.log(error);
            }
            return articleData;
        });
    }
    function print() {
        fs_1.default.writeFileSync("./article.json", JSON.stringify({
            time: new Date(),
            option,
            data,
        }));
        console.log("抓取完成");
        page.close();
    }
    function collectData() {
        return __awaiter(this, void 0, void 0, function* () {
            let pageData = yield getPage(nowPage);
            console.log(`第${nowPage}页开始`);
            for (var index = 0; index < pageData.length; index++) {
                const item = pageData[index];
                if (index == pageData.length - 1) {
                    nowPage++;
                    collectData();
                    return false;
                }
                const articleData = yield getData(item);
                if ((0, qualified_1.default)(articleData, option)) {
                    data.push(articleData);
                    if (data.length == option.number) {
                        print();
                        process.exit(1);
                    }
                }
            }
        });
    }
    collectData();
}))();
