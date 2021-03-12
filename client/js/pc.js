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
 !必须获取text不能是HTML因为有代码高亮会添加span标签
*/
$('article').on("click", '.code-copy', function () {
    let index = $('article .code-copy').index($(this))
    let text = $('article pre code').eq(index).text();
    copy(text);
    alert('复制成功')
});

$(window).on('scroll', function () {
    if (window.pageYOffset > 301) {
        $('#writer').addClass('scroll-fixed')
    } else {
        $('#writer').removeClass('scroll-fixed')
    }
})

$('#qq').on('click', function () {
    copy('1974109227')
    alert('已复制QQ1974109227')
});




function getTop(e) {
    let top = e.offsetTop;
    while (e = e.offsetParent) {
        top += e.offsetTop;
    }
    return top;
}
