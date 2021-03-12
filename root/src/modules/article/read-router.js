import axios from 'axios';

async function readRouter(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/read-router',
        data: {
            router: getData.router
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default readRouter;