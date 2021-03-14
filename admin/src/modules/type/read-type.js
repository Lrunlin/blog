import axios from 'axios';

async function readType(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/read-type',
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default readType;