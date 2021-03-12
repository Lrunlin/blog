import axios from 'axios';
async function deleteArticleSelectRouter(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/delete-article-selectRouter',
        data: {
            router: getData.router,
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default deleteArticleSelectRouter;