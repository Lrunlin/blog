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
    if (jquery('#delete_image')) {
        jquery('#delete_image').remove()
    }
    jquery('body').append(`<div id="delete_image" style="display:none;">${html}</div>`)
    const img = jquery('#delete_image img');
    jquery.each(img, function (i, el) {
        const src = jquery(el).attr('data-src').replace(assets + '/image/', '');
        imageHub.push(src);
    });
    axios.post(`${assets}/delete-assets`, {
        images: imageHub
    }).then(res => {});
}