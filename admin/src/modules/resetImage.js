import jquery from "jquery";

/*
@params html 从数据库里面读取的html
@return html 重置后的HTML
todo 用于文章更新时的富文本编辑器重置HTML（主要是处理img取消懒加载）
*/


export default function resetImage(html) {
    if (jquery('#reset_image')) jquery('#reset_image').remove();
    jquery('body').append(`<div id="reset_image" style="display:none;">${html}</div>`);
    jquery.each(jquery('#reset_image img'), function (i, el) {
        jquery(el).attr('src', jquery(el).attr('data-src'))
    });
    return jquery('#reset_image').html()
}