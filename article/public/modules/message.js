function message(mes) {
    let dom = $(`<div >${mes}</div>`)
    $('body').append(dom);
    dom.css({
        padding: "3px 5px",
        backgroundColor: 'rgb(211, 211, 211)',
        border: '1px solid black',
        opacity: '0.3',
        position: "fixed",
        bottom: "15vh",
        left: ($(window).innerWidth() - dom.innerHeight()) / 2,
        borderRadius: '5px'
    })
    dom.animate({
        opacity: '1'
    }, 300, function () {
        setTimeout(() => {
            dom.remove()
        }, 2000);
    })
}
export default message;