import axios from 'axios'

async function readArticle(getData) {
    let data;
    await axios({
        url: '/read-article',
        method: "POST",
        data: {
            time: getData.time,
            index: getData.index
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default readArticle;