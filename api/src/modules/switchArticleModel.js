const decode = require('js-base64').decode;
/*
todo 转换文章处理base64和布尔值转换文章类型转换的问题
*/

// interface item {
//     title ? : String;
//     article?:string;
//     introduce?:string;
//     isShow?:number|boolean;
//     isTop ?: number | boolean;
//     type?:string|array
// }


function switchArticleModel(item) {
    let needDecode = ["title", "article", "introduce"];
    Object.keys(item).forEach(el => {
        if (needDecode.includes(el)) item[el] = decode(item[el]);
    });
    if (item.type) item.type = item.type.split(",");
    if (item.isShow !== undefined) item.isShow = !!item.isShow;
    if (item.isTop !== undefined) item.isTop = !!item.isTop;
    return item;
}
module.exports = switchArticleModel