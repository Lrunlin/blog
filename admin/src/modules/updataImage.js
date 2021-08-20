import jquery from "jquery";
import axios from 'axios';
import store from '@/store'
/*
@params newHtml 修改后的HTML
@params oldHtml 从数据库里面读取的html
todo 用于文章更新时的处理图片（删除，更新）
*/
export default function updataImage(newHtml, oldHtml) {
    let newArr = []; //修改后的图片
    let oldArr = []; //取出来的图片
    jquery.each(jquery(oldHtml).find('img'), function (i, el) {
        oldArr.push(jquery(el).attr('src').replace(`${store.state.assetsapi}/image/`, ''))
    });
    jquery.each(jquery(newHtml).find('img'), function (i, el) {
        if (jquery(el).attr('src').indexOf('temporary') != -1) {
            newArr.push(jquery(el).attr('src').replace(`${store.state.assetsapi}/temporary/`, ''))
        } else {
            newArr.push(jquery(el).attr('src').replace(`${store.state.assetsapi}/image/`, ''))
        }
    });
    
    let move = newArr.filter(item => !oldArr.includes(item));
    let remove = oldArr.filter(item => !newArr.includes(item));
    axios.post(store.state.assetsapi + '/delete-assets', {
        images: remove
    })
    axios.post(store.state.assetsapi + '/moveTemporaryImages', {
        images: move
    })
}