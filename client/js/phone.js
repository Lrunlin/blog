import copy from "../modules/copy.js";
$('#close').on('click', function () {
    $('#layer').hide();
    $('#tools').hide(500);
});
// 点击红色齿轮旋转
let thisRotate = 0;
$('#addPhone').on('click', function () {
    thisRotate -= 90
    $('#layer').show();
    $('#tools').show(500);
    $('#addPhone').css({
        transform: `rotate(${thisRotate}deg)`
    }, 500)
});

$('#wechatPhone').on('click', function () {
    $('#tools').hide(500);
    $('#wxQrcode').show(500)
})
$('#qqPhone').on('click', function () {
    copy('1974109227')
    alert('QQ：1974109227，已复制到粘贴板')
});
$('#layer').on('click', function () {
    $('#tools,#layer,#wxQrcode').hide(500);

})
