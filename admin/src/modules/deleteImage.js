import jquery from "jquery";
import axios from 'axios';
import store from '@/store';

/*
todo 删除文章时删除图片
@params html 用户删除的HTML
*/


export default function deleteImage(html) {
    let assets = store.state.assetsapi;
    let imageHub = [];
    const img = jquery(html).find('img')
    jquery.each(img, function (i, el) {
        const src = jquery(el).attr('data-src').replace(assets + '/image/', '');
        imageHub.push(src);
    });
    if (imageHub.length) {
        axios.post(`${assets}/delete-assets`, {
            images: imageHub
        })
    }
};