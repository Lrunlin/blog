import copy from "../modules/copy.js";


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



