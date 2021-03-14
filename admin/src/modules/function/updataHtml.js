import store from '../../store/index';
import deleteAssets from "@/modules/article/delete-assets";
import moveTemporaryImages from "@/modules/article/moveTemporaryImages";

function updataHtml(data) {
    let assets = store.state; //vuex

    let oldArr = []; //旧的HTML的全部图片
    let newArr = []; //修改后HTML的全部图片
    let add = []; //需要添加的数组
    let remove = []; //需要删除的数组
    let oldImg = document.querySelectorAll('#updataHtml img');
    oldImg.forEach(el => {
        let src = el.getAttribute('src').replace(assets.assets + 'image/', '');
        oldArr.push(src);
    });
    let newImg = document.querySelectorAll('.w-e-text img');
    newImg.forEach(el => {
        //根据路径查找关键词添加新图片
        if (el.getAttribute('src').indexOf('image/') == -1) {
            let src = el.getAttribute('src').replace(assets.assets + 'temporary/', '')
            add.push(src)
            newArr.push(src)
        } else {
            let src = el.getAttribute('src').replace(assets.assets + 'image/', '')
            newArr.push(src)
        }
    });

    // 准备数组相减，查出修改后的旧图片(修改文件后的旧图片)新HTML过滤掉添加的HTML
    let old = newArr.filter(el => !add.includes(el));
    remove = oldArr.filter(el => !old.includes(el));




    deleteAssets({
        api: assets.assetsapi,
        images: remove
    })
    moveTemporaryImages({
        api: assets.assetsapi,
        images: add
    })




}
export default updataHtml;