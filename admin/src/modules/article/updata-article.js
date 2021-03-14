import axios from 'axios';
import {
    Base64
} from "js-base64";

async function updataArticle(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/updata-article',
        data: {
            router: getData.router,
            type: getData.type,
            introduce: getData.introduce,
            article: Base64.encode(document.getElementById('changeHtml').innerHTML),
            isTop: getData.isTop,
            isShow: getData.isShow,
            time: getData.time,
            idrouter:getData.idrouter
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default updataArticle;