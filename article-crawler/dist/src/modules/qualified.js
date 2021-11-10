"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
function qualified(articleData, option) {
    const $ = cheerio_1.default.load(articleData.html);
    let result = true;
    if (!option.image && $("img").length) {
        result = false;
    }
    if (!option.time && +new Date() - +new Date(articleData.time) > 9.46707779 * Math.pow(10, 10)) {
        result = false;
    }
    if (!option.a && $("a").length) {
        result = false;
    }
    if (option.keyword && !$.text().includes(option.keyword + "")) {
        result = false;
    }
    if (option.prohibited && $.text().includes(option.prohibited + "")) {
        result = false;
    }
    return result;
}
exports.default = qualified;
