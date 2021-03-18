import axios from 'axios';

async function createArticle(getData) {
    console.log(getData);
    let data;
    await axios({
        method: "POST",
        url: '/create-article',
        data: {
            router: getData.router,
            type: getData.type,
            title: getData.title,
            introduce: getData.introduce,
            article: getData.article,
            isTop: getData.isTop,
            isShow: getData.isShow
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default createArticle;