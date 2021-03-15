import copy from "../modules/copy.js";
let pre = document.getElementsByTagName('pre');
for (let index = 0; index < pre.length; index++) {
    const el = pre[index];
    const code = el.getElementsByTagName('*')[0];
    for (let index = 0; index < pre.length; index++) {
        const el = pre[index];
        const copy = document.createElement("div");
        copy.className = "code-copy";
        copy.innerText = '复制'
        el.insertBefore(copy, code);

    }
    const num = document.createElement('div');
    num.className = 'code-number'
    el.insertBefore(num, code)
    let height = num.offsetHeight - 20; //减去padding
    // 用总高度除每个文字的高度{我也不知道为啥除18，用开发者工具查是18}
    for (let i = 0; i < (height / 18).toFixed(0); i++) {
        num.innerHTML += `<span>${i+1}</span>`
    }
}
/* 
 ?点击按钮通过copy模块来复制对应索引值的代码
 !必须获取text不能是HTML因为有代码高亮
*/
$('article').on("click", '.code-copy', function () {
    let index = $('article .code-copy').index($(this))
    let text = $('article pre code').eq(index).text();
    copy(text);
    alert('复制成功')
});


function lazyLoad() {
    let pc = screen.width > 600;
    let height = $(document).scrollTop() + $(window).height() + 100;
    //获取宽度，并且根据宽度选择对应图片{提前100像素加载}
    let img = $('img');
    $.each(img, function (i, el) {
        if ($(el).offset().top < height) {
            if ($(el).attr('data-src')) {
                let src = $(el).attr('data-src')
                $(el).attr('src', src)
            }
        }
    });
}
lazyLoad()
$(window).on('scroll', lazyLoad)
// 页面滑动，缩放