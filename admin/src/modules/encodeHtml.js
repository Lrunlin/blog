import jquery from "jquery";
import store from '@/store';

/*
todo 处理HTML将富文本编辑器里面的HTML转为真实DOM，并且处理图片src,alt
@params html 富文本的HTML
@params type 当前文章的类型
@return html 处理好的html
*/

export default function encodeHtml(html, type) {
    let assets = store.state.assetsapi;
    let typeText = type.join(',')
    const dom = jquery(`<div>${html}</div>`);
    jquery.each(dom.find("img"), function (i, el) {
        const src = jquery(el).attr("src");
        jquery(el).attr("data-src", src.replace(assets + '/temporary', assets + '/image'))
            .attr("alt", `博客文章类型:刘润霖,${typeText}`)
            .attr("title", `查看图片:${typeText}`)
            .removeAttr("style contenteditable src");
    });

    return dom.html();
};