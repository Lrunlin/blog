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

    let pre = document.querySelectorAll("#changeHtml pre");
    if (pre.length) {
        for (let index = 0; index < pre.length; index++) {
            const el = pre[index];
            if (el.getAttribute('data-handle') != "true") {
                el.setAttribute("data-handle", "true");
                const code = el.getElementsByTagName("*")[0];
                // 弄标题
                const title = document.createElement("div");
                title.innerHTML = el.getAttribute("type");
                title.className = "code-title";
                el.insertBefore(title, code);
            }
        }
        let codeTitle = document.getElementsByClassName('code-title');
        for (let i = 0; i < codeTitle.length; i++) {
            codeTitle[i].innerHTML += `
            <div class="bar" style="background: red;"></div>
            <div class="bar" style="background: green;"></div>
            <div class="bar" style="background: yellow;"></div>
            `;
        }
    }
    return images;
}
export default createHtml;