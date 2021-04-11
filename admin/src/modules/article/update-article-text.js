import axios from 'axios';
async function updataArticleText(getData) {
    console.log(getData);
    let data;
    await axios({
        method: "POST",
        url: '/updata-article-text',
        data: {
            router: getData.router,
            article: getData.article,
        }
    }).then(res => {
        data = res.data;
    })
    return data;
};
export default updataArticleText;