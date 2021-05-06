const copy = function (value) {
     $('article').append(`<input type="text" class="copy-text" maxlength=999999999 >`)
     $('.copy-text').val(value).select();
     document.execCommand("copy")
     $('.copy-text').remove()
 }
// 处理代码块添加dom
$("article pre").append(`<div class="code-number"></div>`)
// 弄标题
$.each($("article pre"), function (i, el) {
    $(el).append(`<div class="code-title">${$(el).attr('type')}
            <div class="code-copy">复制</div>
            <div class="bar" style="background: red;left: 20px;"></div>
            <div class="bar" style="background: green;left: 50px;"></div>
            <div class="bar" style="background: yellow;left: 80px;"></div>
    </div>`)
});
// 添加数字
$.each($('.code-number'), function (i, el) {
    let height = el.offsetHeight - 20; //减去padding（顶部的标题块）
    //代码块侧边行数： 用总高度除每个文字的高度{span行高设置的18}
    for (let i = 0; i < (height / 18).toFixed(0); i++) {
        $(el).append(`<span>${i+1}</span>`)
    }
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
// let time = (new Date(article.time).getTime() - new Date().getTime()) * -1 / 86400000;
// if (time > 60) {
//     $('#articleWarn').show();
//     $('#warnTime').text(time.toFixed(0));
// }

