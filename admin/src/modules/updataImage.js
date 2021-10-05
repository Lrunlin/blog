import jquery from "jquery";
import axios from 'axios';
import store from '@/store';
/*
todo 用于文章更新时的处理图片（删除，更新）
@params newHtml 修改后的HTML
@params oldHtml 从数据库里面读取的html(要经过resetImage初始化)
@return move 需要移动的图片
@return remove 需要删除的图片
*/
export default function updataImage(newHtml, oldHtml) {
    let path = store.state.assetsapi;
    let newArr = []; //修改后的图片
    let oldArr = []; //取出来的图片(数据库)

    jquery.each(jquery(`<div>${oldHtml}</div>`).find('img'), function (i, el) {
        oldArr.push(jquery(el).attr('src').replace(`${path}/image/`, ''))
    });
    //新的HTML里面可能有旧的图片所以需要判断
    //?也可以只取temporary中的省去move数组的去重
    //!但是涉及到remove数组的去重问题，需要修改逻辑，现在也能跑还是不要动了吧
    jquery.each(jquery(`<div>${newHtml}</div>`).find('img'), function (i, el) {
        if (jquery(el).attr('src').includes('temporary')) {
            newArr.push(jquery(el).attr('src').replace(`${path}/temporary/`, ''))
        } else {
            newArr.push(jquery(el).attr('src').replace(`${path}/image/`, ''))
        };
    });
    // 互相去重，除去原有并且没有改动的照片
    // 如果新的HTML没有的图片旧的有就是删除
    // 如果旧的HTML没有的图片新的有就是使用的需要移动
    let move = newArr.filter(item => !oldArr.includes(item));
    let remove = oldArr.filter(item => !newArr.includes(item));
    console.log(move);
    console.log(remove);
    if (move.length) {
        axios.put(`${store.state.assetsapi}/assets`, {
            images: move
        });
    }
    if (remove.length) {
        axios.delete(`${store.state.assetsapi}/assets`, {
            params: {
                images: remove
            }
        });
    }
}