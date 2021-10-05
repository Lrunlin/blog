import jquery from "jquery";

/*
@params html 从数据库里面读取的html
@return html 重置后的HTML
todo 用于文章更新时的富文本编辑器重置HTML（主要是处理img取消懒加载）
*/

export default function resetImage(html) {
    let dom = jquery(`<div>${html}</div>`);
    jquery.each(dom.find('img'), function (i, el) {
        jquery(el).attr('src', jquery(el).attr('data-src'))
    });
    return dom.html();
};