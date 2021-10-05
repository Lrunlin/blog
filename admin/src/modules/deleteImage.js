import jquery from "jquery";
import store from '@/store';
import axios from 'axios';

/*
todo 删除文章时删除图片
@param html 用户删除的HTML
@return imageHub string[] 需要被删除的图片
*/

export default function deleteImage(html) {
    let assets = store.state.assetsapi;
    let imageHub = [];
    const img = jquery(`<div>${html}</div>`).find('img');
    jquery.each(img, function (i, el) {
        const src = jquery(el).attr('data-src').replace(assets + '/image/', '');
        imageHub.push(src);
    });
    if (imageHub.length) {
        axios.delete(`${store.state.assetsapi}/assets`, {
            params: {
                images: imageHub,
            },
        });
    }
};