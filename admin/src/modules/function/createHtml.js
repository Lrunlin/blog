/*
@params type html path 类型 HTML代码 文件地址
*/

function createHtml(data) {
    if (document.getElementById('changeHtml')) {
        document.getElementById('changeHtml').remove();
    }
    let html = document.createElement('div');
    html.style.display = 'none';
    html.id = "changeHtml";
    html.innerHTML = data.html;
    document.body.append(html);
    let images = []; //存储被选中的图片
    let img = document.querySelectorAll("#changeHtml img");
    if (img.length) {
        img.forEach((el, i) => {
            if (el.getAttribute("src")) {
                //只有第一次点击时候会处理图片（第一次会删除src第二次就不好使了）
                el.setAttribute("data-src", el.getAttribute("src"));
                el.removeAttribute("src");
                el.setAttribute("alt", `关于${data.type}技术讲解图片`);
                let oldPath = data.path + "temporary";
                // let newPath = data.path + "image";
                let dataSrc = el.getAttribute("data-src");
                // el.setAttribute("data-src", dataSrc.replace(oldPath, newPath));
                el.setAttribute("data-src", dataSrc.replace("temporary", "image"));
                //将临时文件夹的路径替换到正式文件夹

                // 获取图片数组
                let src = dataSrc.replace(oldPath + "/", "");
                images.push(src);
            }
        });
    }
    return images;
}
export default createHtml;