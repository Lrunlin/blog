import axios from 'axios';
async function deleteArticle(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/delete-article',
        data: {
            router: getData.router
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default deleteArticle;