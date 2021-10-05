import jquery from "jquery";
import store from '@/store';
import axios from 'axios';

/*
todo 文章保存时判断哪些文章被正式使用并发送请求 
@param html 新的HTML（提取新文章HTML中的img）
*/

export default function moveImage(html) {
    let assets = store.state.assetsapi;
    let imageHub = [];
    const img = jquery(`<div>${html}</div>`).find('img');
    jquery.each(img, function (i, el) {
        const src = jquery(el).attr('data-src').replace(assets + '/image/', '');
        imageHub.push(src);
    });
    //!只有需要处理的图片大于1才发送移动图片请求
    if (imageHub.length) {
        axios.put(`${store.state.assetsapi}/assets`, {
            images: imageHub
        });
    }
}