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
const inquiry_1 = require("./inquiry");
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const optionList = () => __awaiter(void 0, void 0, void 0, function* () {
    let typeMessage = "";
    let tagStringData = (yield axios_1.default.get("https://segmentfault.com/tags")).data +
        "" +
        (yield axios_1.default.get("https://segmentfault.com/tags?sort=hottest&page=2")).data;
    let typeTag = [];
    let tag1Dom = cheerio_1.default.load(tagStringData);
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
    let number = yield (0, inquiry_1.inquiry)("抓取文章数量?(number)");
    let image = yield (0, inquiry_1.inquiry)("是否允许包含图片？（Y/N）");
    let time = yield (0, inquiry_1.inquiry)("是否只要三年之内的文章？（Y/N）");
    let keyword = yield (0, inquiry_1.inquiry)("文章要求必须有某个关键字？（string/N）");
    let prohibited = yield (0, inquiry_1.inquiry)("文章禁止包含某个关键词？（string/N）");
    let a = yield (0, inquiry_1.inquiry)("是否允许包含超链接？（Y/N）");
    let type = yield (0, inquiry_1.inquiry)(`选择查询的文章类型（输入序号）\n ${typeMessage}`);
    let typeResult = typeTag.find(item => item.index == +type);
    type = (typeResult === null || typeResult === void 0 ? void 0 : typeResult.href) || "javascript";
    inquiry_1.rl.close();
    let option = {
        number,
        image,
        time,
        keyword,
        prohibited,
        a,
        type,
    };
    let test = /^[\s\S]*.*[^\s][\s\S]*$/;
    let optionSwitch = {
        number: value => (isNaN(+value) ? +value : +value < 1 ? 10 : +value),
        image: value => value.toLowerCase() == "y",
        time: value => value.toLowerCase() == "y",
        keyword: value => (value.toLowerCase() == "n" || !test.test(value) ? false : value),
        prohibited: value => (value.toLowerCase() == "n" || !test.test(value) ? false : value),
        a: value => value.toLowerCase() == "y",
        type: value => value,
    };
    function isValidKey(key, object) {
        return key in object;
    }
    let outputOption = {};
    Object.values(option).forEach((value, index) => {
        let key = Object.keys(option)[index];
        outputOption[key] = value;
        if (isValidKey(key, optionSwitch)) {
            outputOption[key] = optionSwitch[key](value);
        }
    });
    return outputOption;
});
exports.default = optionList;
