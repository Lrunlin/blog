import jquery from "jquery";
import store from '@/store';

/*
todo 处理HTML将富文本编辑器里面的HTML转为真实DOM，并且处理图片src,alt
@params html 富文本的HTML
@params type 当前文章的类型
*/


export default function setImageDom(data) {
    let {
        html,
        type
    } = data;
    let assets = store.state.assetsapi;
    if (jquery("#set_image")) jquery("#set_image").remove();
    jquery("body").append(`<div id="set_image" style="display:none;">${html}</div>`);
    const img = jquery("#set_image").find("img");
    jquery.each(img, function (i, el) {
        const src = jquery(el).attr("src");
        jquery(el).attr("data-src", src.replace(assets + '/temporary', assets + '/image')).attr("alt", `刘润霖博客文章类型:${type}`).removeAttr("style contenteditable src");
    });
}