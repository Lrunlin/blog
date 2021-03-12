import axios from 'axios';

async function createType(getData) {
    let data;
    await axios({
        method: "POST",
        url: '/create-type',
        data: {
            type: getData.type
        }
    }).then(res => {
        data = res.data;
    })
    return data;
}
export default createType;