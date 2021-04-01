import copy from '../modules/copy.js';
let pre = document.getElementsByTagName('pre');
for (let index = 0; index < pre.length; index++) {
    const el = pre[index];
    const code = el.getElementsByTagName('*')[0];
    const num = document.createElement('div');
    num.className = 'code-number'
    el.insertBefore(num, code)
    let height = num.offsetHeight - 20; //减去padding
    // 用总高度除每个文字的高度{我也不知道为啥除18，用开发者工具查是18}
    for (let i = 0; i < (height / 18).toFixed(0); i++) {
        num.innerHTML += `<span>${i+1}</span>`
    }
}



let title = document.getElementsByClassName('code-title');
for (let i = 0; i < title.length; i++) {
    const copy = document.createElement("div");
    copy.className = "code-copy";
    copy.innerText = '复制';
    title[i].append(copy)
}



//代码块添加三个小点
$.each($('.code-title'), function (i, el) {
    $(el).append(`
     <div class="bar" style="background: red;left: 20px;"></div>
            <div class="bar" style="background: green;left: 50px;"></div>
            <div class="bar" style="background: yellow;left: 80px;"></div>
    `)
});




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





// 顶部提示，计算多长时间，判断是否显示
let time = (new Date(article.time).getTime() - new Date().getTime()) * -1 / 86400000;
if (time > 60) {
    $('#articleWarn').show();
    $('#warnTime').text(time.toFixed(0));
}
let types = article.type.split(',');
$.each(types, function (i, el) {
    $('#footType').
    append(`
    <a href="https://blogweb.cn/search?type=${el}">${el}</a>
    <span class="type">,</span>
    `);
});
$('.type:last').remove()

$('#articleTime').text(article.time.substr(0,10))


$('.show-qrcode').on('click', function () {
    let index = $('.show-qrcode').index($(this));
    $('#alert').show();
    $('.qrcode').eq(index).show();
    $('.qrcode').eq(index).attr('src', $('.qrcode').eq(index).attr('data-src'))
});
$('.qrcode').on('click', function (e) {
    e.stopPropagation()
});
$('#alert').on('click', function () {
    $(this).hide();
    $('#alert img').hide();
});
