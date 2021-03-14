import axios from 'axios';

async function readArticle(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/read-article',
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