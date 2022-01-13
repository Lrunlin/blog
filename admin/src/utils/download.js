function download(data) {
    let _data;
    if (Array.isArray(data)) {
        _data = data.map(item => {
            let _item = {
                router: item.router,
                title: item.title,
                content: item.article,
                type: item.type,
                time: item.time
            }
            return _item;
        })
    } else {
        _data = {
            router: data.router,
            title: data.title,
            content: data.article,
            type: data.type,
            time: data.time
        }
    };
    let blob = new Blob([JSON.stringify({
        data: _data
    })]);
    let objectUrl = window.URL.createObjectURL(blob)
    let a = document.createElement('a');
    a.href = objectUrl
    a.download = `${+new Date()}.json`
    document.body.appendChild(a)
    a.click()
}
export default download;